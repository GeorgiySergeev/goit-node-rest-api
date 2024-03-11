import express from 'express';

import validateBody from '../middlewares/validateBody.js';
import { authUserSchema, updateUserSchema } from '../schemas/userSchema.js';

import ctrl from '../controllers/auth.js';

import authenticate from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';
const authRouter = express.Router();

authRouter.get('/', (req, res, next) => {
  res.json('Message: auth GET succsess');
});

authRouter.post('/register', validateBody(authUserSchema), ctrl.register);

authRouter.post('/login', validateBody(authUserSchema), ctrl.login);

authRouter.post('/logout', authenticate, ctrl.logout);

authRouter.get('/current', authenticate, ctrl.current);

authRouter.get('/avatars', authenticate, ctrl.getAvatar);

authRouter.patch('/avatars', authenticate, upload.single('avatar'), ctrl.uploadAvatar);

authRouter.patch(
  '/:id',

  authenticate,
  validateBody(updateUserSchema),
  ctrl.updateSubscription,
);

export default authRouter;
