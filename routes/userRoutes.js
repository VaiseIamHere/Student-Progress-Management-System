import express from "express"
import userCrud from "../controllers/userCrud.js"
import { registerUser, loginUser } from "../controllers/userService.js"
import authenticate from "../middlewares/authentication.js"

const router = express.Router()

router.post('/registeruser', registerUser)
router.post('/login', loginUser)

router.get('/download-csv', userCrud.downloadUsers)
router.post('/createUsers', userCrud.createUsers)
router.get('/viewUsers', userCrud.viewUsers)
router.get('/viewUser', userCrud.viewUser)

router.delete('/delete', authenticate, userCrud.deleteUser)
router.put('/updateUser', authenticate, userCrud.updateUser)

export default router
