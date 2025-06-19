import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const connectDB = (app) => {
    mongoose.connect(process.env.DATABASE_PATH)
    .then(()=>{
        console.log("Connected to Database.")
        app.listen(process.env.PORT, () => {
            console.log(`Server started and Listening at: http://localhost:${process.env.PORT}`)
        })
    })
    .catch(()=>{
        console.log("Connection to Database Failed !!")
    })
}
