import sgMail from '@sendgrid/mail';
import HttpError from './HttpError.js';

import 'dotenv/config.js';

const { SENDGRID_API_KEY, SENDER_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

// const result = await sgMail.send(email);
// console.log(result);

const sendEmail = async (data) => {
  console.log('Send verify email', data);
  const email = { ...data, from: SENDER_EMAIL };
  await sgMail.send(email);
  return true;
};
export default sendEmail;

// javascript
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'test@example.com', // Change to your recipient
//   from: 'test@example.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })
