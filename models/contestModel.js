import { Schema, model } from "mongoose"

const ContestSchema = Schema(
    {
        contestName: {
            type: String,
            required: true
        },
        contestId: {
            type: Number,
            required: true,
            unique: true
        },
        startTime: {
            type: Date,
            required: true
        },
        numberOfProblems: Number
    }
)

const ContestModel = model("Contest", ContestSchema)

export default ContestModel
