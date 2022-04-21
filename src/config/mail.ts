import nodemailer from 'nodemailer'
import { Request, Response, NextFunction } from 'express'

const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: 'cchiama77@gmail.com',
    pass: '250977cC',
  },
  secure: true,
})
const mailData = {
  from: 'cchiama77@gmail.com',
  to: 'cchiama77@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!',
  html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
}

const mailer = (req: Request, res: Response, next: NextFunction) => {
  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
  next()
}

export { transporter, mailData, mailer }
