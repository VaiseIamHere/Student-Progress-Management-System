import axios from "axios"

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const fetchUserData = async (userhandle) => {
    try{

        await wait(1000)
        const r = await axios.get(
            'https://codeforces.com/api/user.info',
            {
                params: {
                    handles: userhandle
                }
            }
        )

        if(r.data.status === 'OK'){
            return r.data.result[0]
        }
        else if(r.data.status === 'FAILED'){
            throw new Error(r.data.comment)
        }
    }
    catch(err){
        console.log("Error in fn: datasync/fetchUserData")
        console.log(err)
        throw err
    }
}

export const fetchUserRatingsHistory = async (userhandle) => {
    try{
        await wait(1000)
        const r = await axios.get(
            'https://codeforces.com/api/user.rating',
            {
                params: {
                    handle: userhandle
                }
            }
        )

        if(r.data.status === 'OK'){
            return r.data.result
        }
        else if(r.data.status === 'FAILED'){
            throw new Error(r.data.comment)
        }
    }
    catch(err){
        console.log("Error in fn: datasync/fetchUserRatingsHistory")
        console.log(err)
        throw err
    }
}

export const fetchContestDetails = async () => {
    try{
        await wait(1000)
        console.log('Request Sent...')
        const r = await axios.get('https://codeforces.com/api/contest.list')
        console.log('Response Received...')

        if(r.data.status === 'OK'){
            return r.data.result
        }
        else if(r.data.status === 'FAILED'){
            throw new Error(r.data.comment)
        }
    }
    catch(err){
        console.log("Error in fn: datasync/fetchContestDetails")
        console.log(err)
        throw err
    }
}

export const numberOfProblemsInContest = async (id) => {
    try{
        await wait(500)
        const r = await axios.get(
            'https://codeforces.com/api/contest.standings',
            {
                params: {
                    contestId: Number(id),
                    from: 1,
                    count: 1
                }
            }
        )

        if(r.data.status === 'OK'){
            return r.data.result.problems.length
        }
        else if(r.data.status === 'FAILED'){
            throw new Error(r.data.comment)
        }
    }
    catch(err){
        console.log("Error in fn: datasync/numberOfProblemsInContest")
        throw err
    }
}
