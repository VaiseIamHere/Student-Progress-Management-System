import cron from 'node-cron'
import { updateContests, updateUsersHistory } from './updateUser.js'

const tasks = async () => {
    await updateContests()
    await updateUsersHistory()
}

cron.schedule("0 2 * * *", tasks)
