import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
// import sgMail from '@sendgrid/mail';

import 'dotenv/config.js';

import contactsRouter from './routes/contactsRouter.js';
import authRouter from './routes/authRouter.js';
import sendEmail from './helpers/sendEmail.js';

const app = express();

// ! =======================================Email
// const testEmail = {
//   to: 'juliyavoice@ukr.net',
//   subject: 'Test email@4',
//   html: '<h1>Hello from Email server!</h1>',
// };
// const verifyEmail = {
//   to: 'juliyavoice@ukr.net',
//   subject: 'Verification email ',
//   html: `<a href ="http://localhost:3000/api/users/verify/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" target="_blank"> Hello, please, verify your email</a>`,
// };

// sendEmail(verifyEmail);

// const { SENDGRID_API_KEY } = process.env;
// sgMail.setApiKey(SENDGRID_API_KEY);

// const email = {
//   to: 's.georgiy@protonmail.com',
//   from: 'georgiy-mail@meta.ua',
//   subject: 'test-mail',
//   html: '<h1>Test Mail</h1>',
// };

// const result = await sgMail.send(email);
// console.log(result);
// ! ===========================================
mongoose
  .connect(process.env.DB_URI)
  .then((conect) => {
    console.log('Database connection successful');
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use(express.static('public'));
app.use('/api/users', authRouter);
app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

// app.get('/avatars', (req, res) => {
//   res.send('Home page');
// });

app.listen(3000, () => {
  console.log('Server is running. Use our API on port: 3000');
});
