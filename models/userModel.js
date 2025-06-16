import mongoose from "mongoose"

const UserSchema = mongoose.Schema(
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
        cfHandle: String,
        currentRating: String,
        maxRating: String
    },
    {
        timestamps: true
    }
)

// UserSchema.post('save', async function (doc, next) {
//     if (doc.cfHandle) {
//         console.log(`cfHandle set to ${doc.cfHandle}`);
//     }
//     next();
// });

// UserSchema.post('findOneAndUpdate', async function (doc, next) {
//     if (doc.cfHandle) {
//         console.log(`cfHandle set to ${doc.cfHandle}`);
//     }
//     next();
// });

const UserModel = mongoose.model('User', UserSchema)

export default UserModel
