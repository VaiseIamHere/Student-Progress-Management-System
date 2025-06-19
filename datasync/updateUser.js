import UserModel from "../models/userModel.js"
import ContestModel from "../models/contestModel.js"
import metadatamodel from '../models/metadatamodel.js'
import PerformanceModel from "../models/contestPerformance.js"
import ProblemModel from "../models/problemModel.js"
import { fetchUserRatingsHistory, fetchContestDetails, fetchContestProblems, fetchUserSubmissions } from "./userdatasync.js"

const updateProblems = async (problems) => {
    await ProblemModel.insertMany(problems)
}

export const updateContests = async () => {
    try{
        const data = await fetchContestDetails()
        const lastStartAt = await metadatamodel.findOne({ metadataid: "metadata"}).lastContestStartTime

        let max = lastStartAt

        console.log("lastStartAt: ", lastStartAt)

        for(const item of data){
            try{
                if(item.startTimeSeconds > lastStartAt){
                    max = Math.max(max, item.startTimeSeconds)

                    const problems = await fetchContestProblems(Number(item.id))

                    await ContestModel.create({
                        contestName: item.name,
                        contestId: item.id,
                        startTime: item.startTimeSeconds,
                        numberOfProblems: problems.length
                    })
                    
                    await updateProblems(problems)
                }
            }
            catch(err){
                console.log(err)
            }
        }

        await metadatamodel.findOneAndUpdate(
            { metadataid: 'metadata' },
            { lastContestStartTime: max }
        )
    }
    catch(err){
        console.log("error in updateContests")
        console.log(err)
    }
}

const numberOfUnsolvedProblems = async (userhandle, id) => {
    const submissions = await fetchUserSubmissions(userhandle, id)
    const mySet = new Set()

    for(const item of submissions){
        if(item.verdict !== 'OK'){
            mySet.add(item.problem.index)
        }
    }

    return mySet.size
}

export const updateUserHistory = async (userhandle, lastRatingUpdateAt, buffer) => {
    try{
        const data = await fetchUserRatingsHistory(userhandle)
        const updatesArray = []
        let updateTime = lastRatingUpdateAt

        for(const item of data){
            if(lastRatingUpdateAt < item.ratingUpdateTimeSeconds){
                updateTime = Math.max(updateTime, item.ratingUpdateTimeSeconds)
                if(!buffer[item.contestId]){
                    const contestObj = await ContestModel.findOne({ contestId: item.contestId })
                    if (!contestObj) continue;
                    buffer[item.contestId] = {
                        ObjId: contestObj._id,
                    }                   
                }

                const { ObjId } = buffer[item.contestId]
                const unsolvedPrbs = await numberOfUnsolvedProblems(userhandle, item.contestId)

                const PerformanceObj = await PerformanceModel.create({
                    contest: ObjId,
                    numberOfUnsolvedProblems: unsolvedPrbs,
                    rank: item.rank,
                    newRating: item.newRating,
                    ratingchange: item.newRating - item.oldRating
                })

                updatesArray.push(PerformanceObj._id)
            }
        }

        if (updatesArray.length > 0) {
            await UserModel.findOneAndUpdate(
                { cfHandle: userhandle },
                {
                    $push: {
                        contests: { $each: updatesArray }
                    },
                    $set: {
                        lastRatingUpdateTime: updateTime
                    }
                }
            );
        }
    }
    catch(err){
        console.log('Error in fn: datasync/updateUserHistory')
        console.log(err)
        throw err
    }
}

export const updateUsersHistory = async () => {
    try{
        const users = await UserModel.find().select("cfHandle lastRatingUpdateTime")
        const buffer = {}
        for(const user of users){
            await updateUserHistory(user.cfHandle, user.lastRatingUpdateTime, buffer)
        }
    }
    catch(err){
        console.log("Error in updateUsersHistory")
        console.log(err)
    }
}
