import { Schema, model } from "mongoose"

const PerformanceSchema = Schema(
    {
        contest: {
            type: Schema.Types.ObjectId,
            ref: 'Contest',
            required: true
        },
        numberOfUnsolvedProblems: Number,
        rank: Number,
        newRating: Number,
        ratingchange: Number
    }
)

const PerformanceModel = model("Performance", PerformanceSchema)

export default PerformanceModel
