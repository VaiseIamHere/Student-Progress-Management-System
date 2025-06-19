import { Schema, model } from "mongoose"

const ProblemSchema = Schema(
    {
        contest: {
            type: Schema.Types.ObjectId,
            ref: 'Contest',
            required: true
        },
        problemname: String,
        rating: Number,
    }
)

const ProblemModel = model("Problem", ProblemSchema)

export default ProblemModel
