import { Schema, model } from "mongoose"
import { updateUserData } from "../middlewares/usermodelmiddleware.js"

const UserSchema = Schema(
    {
        username: {
            type: String,
            unique: [true, 'Username already exists...'],
            required: [true, 'Username required...']
        },
        email: {
            type: String,
            unique: [true, 'One emailId can be linked to only one User...'],
            required: [true, 'User email required...'],
            validate: {
                validator: (v) => validator.isEmail(v),
                message: props => `${props.value} is not a valid email!`
            }
        },
        phoneNumber: {
            type: String,
            validate: {
                validator: (v) => {
                    return /\d{10}/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            },
            required: [true, 'User phone number required']
        },
        password: {
            type: String,
            required: true
        },
        cfHandle: {
            type: String,
            unique: true
        },
        contests: [{
            type: Schema.Types.ObjectId,
            ref: 'Performance'
        }],
        problems: [{
            type: Schema.Types.ObjectId,
            ref: 'ProblemSolved'
        }],
        currentRating: Number,
        maxRating: Number,
        currentRank: String,
        maxRank: String,
        lastRatingUpdateTime: {
            type: Number,
            default: 0
        },
        admin: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

UserSchema.pre('save', updateUserData)
UserSchema.pre('findOneAndUpdate', updateUserData)

const UserModel = model('User', UserSchema)

export default UserModel
