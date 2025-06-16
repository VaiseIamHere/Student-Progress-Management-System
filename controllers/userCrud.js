import UserModel from "../models/userModel.js"
import { Parser } from "json-2-csv"

export const createUsers = async (req, res) => {
    

    await UserModel.create(req.body)
}

export const downloadUsers = async (req, res) => {
    try{
        const json2csv = new Parser()
        const users = await UserModel.find({}).select('-password').lean()

        const csv = json2csv(users)

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=data.csv');
        res.status(200).send(csv);
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({"Error": err.message})
    }
}

