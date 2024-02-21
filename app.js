import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config.js';

import contactsRouter from './routes/contactsRouter.js';

const app = express();

mongoose
  .connect(process.env.DB_URI)
  .then((conect) => {
    console.log('Database connection successful');
    // console.log(con);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

app.get('/', (req, res) => {
  res.send('Home page');
});

app.listen(3000, () => {
  console.log('Server is running. Use our API on port: 3000');
});
