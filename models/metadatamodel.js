import { Schema, model } from "mongoose"

const metadataSchema = Schema(
    {
        metadataid: {
            type: String,
            unique: true
        },
        lastContestStartTime: Number
    }
)

const metadatamodel = model('metadatamodel', metadataSchema)

export default metadatamodel

