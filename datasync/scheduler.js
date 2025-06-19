import cron from 'node-cron'
import { updateContests, updateUsersHistory } from './updateUser.js'

const tasks = async () => {
    await updateContests()
    await updateUsersHistory()
}

export const scheduler = () => {
    console.log("Tasks Scheduled..")
    cron.schedule("0 2 * * *", tasks)
}
