import express from 'express'
import dotenv from 'dotenv'
import router from './routes/userRoutes.js'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/', router)

app.get("/", (req, res) => {
    return res.send("App started Listening...")
})


app.listen(process.env.PORT, () => {
    console.log(`App started listen at: http://localhost:${process.env.PORT}`)
})
