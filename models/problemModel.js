import { Schema, model } from "mongoose"

const ProblemSchema = Schema(
    {
        contestId: Number,
        index: String,
        name: String,
        type: String,
        points: Number,
        rating: Number,
        tags: [String]
    }
)

const ProblemModel = model("Problem", ProblemSchema)

export default ProblemModel
