import Joi from 'joi';

export const authUserSchema = new Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const updateUserSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});
