import UserModel from "../models/userModel.js"
import ContestModel from "../models/contestModel.js"
import metadatamodel from '../models/metadatamodel.js'
import { fetchUserRatingsHistory, fetchContestDetails, numberOfProblemsInContest } from "./userdatasync.js"

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const updateContests = async () => {
    try{
        console.log("Function Called...")
        const data = await fetchContestDetails()
        const lastStartAt = (await metadatamodel.find({ metadataid: "metadata"}))[0].lastContestStartTime

        let max = lastStartAt
        let errorCount = 1
        let itemCount = 1

        console.log("lastStartAt: ", lastStartAt)

        for(const item of data){
            try{
                if(item.startTimeSeconds > lastStartAt){
                    console.log(`Processing contest ${item.id}: ${item.name}...`) // ADD THIS

                    max = Math.max(max, item.startTimeSeconds)

                    await wait(600)

                    const problemCount = await numberOfProblemsInContest(Number(item.id)) // ADD THIS LOGIC
                    console.log(`Fetched problem count: ${problemCount}`) // ADD THIS

                    await ContestModel.create({
                        contestName: item.name,
                        contestId: item.id,
                        startTime: item.startTimeSeconds,
                        numberOfProblems: problemCount
                    })

                    console.log(`${itemCount} Item Created`)
                    itemCount = itemCount + 1
                }
            }
            catch(err){
                console.log(`Error ${errorCount}`)
                errorCount = errorCount + 1
            }
        }

        if(item >= 1000){
            await metadatamodel.findOneAndUpdate(
                { metadataid: 'metadata' },
                { lastContestStartTime: max }
            )
        }
    }
    catch(err){
        console.log("error in updateContests")
        console.log(err)
    }
}

export const updateUserHistory = async (userhandle) => {
    try{
        const data = await fetchUserRatingsHistory(userhandle)
        const updates = {}
        let updateTime = lastRatingUpdateAt

        for(const item of data){
            if(lastRatingUpdateAt < item.ratingUpdateTimeSeconds){
                updateTime = Math.max(updateTime, item.ratingUpdateTimeSeconds)


                const contest = new ContestModel({
                    contestName: item.contestName,
                    contestId: item.contestId,
                    startTime,
                    rank,
                    oldRating,
                    newRating,
                    ratingchange
                })
            }
        }
    }
    catch(err){
        console.log('Error in fn: datasync/updateUserHistory')
        console.log(err)
        throw err
    }
}
