import { Schema, model } from "mongoose"

const ProblemSolvedSchema = Schema(
    {
        contest: {
            type: Schema.Types.ObjectId,
            ref: 'Problem',
            required: true
        },
        lastSolved: Number,
    }
)

const ProblemSolvedModel = model("ProblemSolved", ProblemSolvedSchema)

export default ProblemSolvedModel
