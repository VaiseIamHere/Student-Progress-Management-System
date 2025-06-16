import dotenv from "dotenv"
import nodemailer from "nodemailer"

dotenv.config()

const sendMail = async (mail) => {
    const email = {
        from: `"Vaibhav & Co." <${process.env.MAIL}>`,
        to: [mail.emailId],
        subject: mail.subject,
        text: mail.body
    }
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_PASSWORD,
        }
    })
    try{
        transporter.sendMail(email)
    }
    catch(err){
        console.log(err)
    }
}

export default sendMail
