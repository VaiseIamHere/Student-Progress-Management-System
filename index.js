import express from 'express'
import dotenv from 'dotenv'

import { updateContests } from './datasync/updateUser.js'
import { connectDB } from './connect.js'

import router from './routes/userRoutes.js'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/', router)

app.get("/", (req, res) => {
    return res.send("App started Listening...")
})

connectDB(app)