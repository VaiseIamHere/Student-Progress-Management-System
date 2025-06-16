import mongoose from "mongoose"

const ContestSchema = mongoose.Schema(
    {
        contestName: {
            type: String,
            required: true
        },
        contestId: {
            type: Number,
            required: true
        },
        startTime: {
            type: Date,
            required: true
        },
        difficulty: {
            type: Number,
            required: true
        },
        oldRating: Number,
        newRating: Number
    }
)

const ContestModel = mongoose.model("Contest", ContestSchema)

export default ContestModel
