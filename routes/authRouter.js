import express from 'express';
import validateBody from '../middlewares/validateBody.js';
import { authUserSchema, updateUserSchema } from '../schemas/userSchema.js';

import {
  register,
  login,
  logout,
  current,
  updateSubscription,
} from '../controllers/authControllers.js';
import authenticate from '../middlewares/auth.js';

const authRouter = express.Router();

authRouter.get('/', (req, res, next) => {
  res.json('Message: auth GET succsess');
});

authRouter.post('/register', validateBody(authUserSchema), register);

authRouter.post('/login', validateBody(authUserSchema), login);

authRouter.post('/logout', authenticate, logout);

authRouter.get('/current', authenticate, current);
authRouter.patch('/:id', authenticate, validateBody(updateUserSchema), updateSubscription);

export default authRouter;
