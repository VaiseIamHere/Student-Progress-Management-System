import UserModel from "../models/userModel.js"
import bcryptjs from "bcryptjs"
import { json2csv } from "json-2-csv"

export const downloadUsers = async (req, res) => {
    try{
        const users = await UserModel.find().lean()
        const csv = json2csv(users)

        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', 'attachment; filename=data.csv')
        res.status(200).send(csv)
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({"Error": err.message})
    }
}

export const viewUser = async (req, res) => {
    try{
        const { username } = req.query.params
        const user = await UserModel.find({ username }).lean()

        return res.status(200).send(user)
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({"Error": err.message})
    }
}

export const updateUser = async (req, res) => {
    try{
        const updates = req.body
        if(updates.password){
            updates.password = await bcryptjs.hash(updates.password, 10)
        }

        delete updates.currentRating
        delete updates.maxRating
        delete updates.currentRank
        delete updates.maxRank
        delete updates.lastRatingUpdateTime
        delete updates.admin

        const updatedUser = await UserModel.findOneAndUpdate(
            { username: req.user.username },
            updates,
            { new: true}
        ).lean()

        return res.status(200).send(updatedUser)
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({"Error": err.message})
    }
}

export const deleteUser = async (req, res) => {
    try{
        await UserModel.deleteOne({ username: req.user.username })
        return res.status(200).send(`User ${req.user.username} deleted sucessfully.`)
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({"Error": err.message})
    }
}

export const viewUsers = async (req, res) => {
    try{
        const userdetails = await UserModel.find().select(
            "username email phoneNumber cfHandle currentRating maxRating"
        )
        return res.status(200).send(userdetails)
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({"Error": err.message})
    }
}

export const createUsers = async (req, res) => {
    try{
        return res.send("Logic Missing!!")
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({"Error": err.message})
    }
}

export default {
    createUsers,
    viewUsers,
    deleteUser,
    updateUser,
    viewUser,
    downloadUsers
}