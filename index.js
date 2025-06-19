import express from 'express'
import dotenv from 'dotenv'
import router from './routes/userRoutes.js'
import { connectDB } from './connect.js'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/', router)

app.get("/", (req, res) => {
    return res.send("App started Listening...")
})

connectDB(app)
