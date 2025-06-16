import express from "express"
import { downloadUsers } from "../controllers/userCrud"

const router = express.Router()

router.get('/download-csv', downloadUsers)

export default router
