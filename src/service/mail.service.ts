import { transporter, mailData } from '@config/mail'
import { logger as Logger } from '@middleware/logger'
import nodemailer, { TransportOptions } from 'nodemailer'

const transport = nodemailer.createTransport(transporter as TransportOptions)

transport
  .verify()
  .then(() => Logger.info('🚀 SMTP server connected'))
  .catch(() => Logger.warn('❌ Unable to connect to SMTP server'))

/**
 * send an email
 */
async function sendMail(): Promise<void> {
  const message = {
    from: mailData.from,
    to: mailData.to,
    subject: mailData.subject,
    text: mailData.text,
    html: mailData.html,
  }
  await transport.sendMail(message)
}

export { transport, sendMail }
