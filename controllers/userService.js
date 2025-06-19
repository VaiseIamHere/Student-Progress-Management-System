import dotenv from "dotenv"
import user from "../../models/userModel.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import sendMail from "../../utils/mailservice.js"

dotenv.config()

export const registerUser = async (req, res) => {
    try{
        if(!req.body.password){
            return res.send("Password required...")
        }
        req.body.password = await bcryptjs.hash(req.body.password, 10)
        delete req.body.admin
        const userObj = await user.create(req.body)
        delete userObj.password

        const mail = {
            'emailId': req.body.emailId,
            'subject': 'Registration Sucessfull !!!',
            'body': 'You are now a registered user of our website.\nEnjoy our website !!!'
        }

        sendMail(req, mail)
        
        return res.status(200).send(userObj)
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({"Error": err.message})
    }
}

export const loginUser = async (req, res) => {
    try{
        const temp = await user.find({'username': req.body.username})
        if(temp.length == 0){
            return res.status(400).send('Cannot find user !!')
        }
        if(await bcryptjs.compare(req.body.password, temp[0].password)){
            const payload = {
                'username': req.body.username
            }
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
            const mail = {
                'emailId': temp[0].emailId,
                'subject': 'Logged In sucessfully',
                'body': 'You logged in to Vaibhav\'s website'
            }
            sendMail(mail)
            return res.status(200).json({
                'msg':'Sucessfully Logged In !!!',
                'accessToken': accessToken
            })
        }
        return res.status(200).send('Invalid email or password')
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({"Error": err.message})
    }
}

const exports__ = {
    registerUser,
    loginUser
}

export default exports__
