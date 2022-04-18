import nodemailer from 'nodemailer'

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

export { transporter, mailData }
