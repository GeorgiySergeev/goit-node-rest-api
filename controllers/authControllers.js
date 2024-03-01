import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import 'dotenv/config.js';

import HttpError from '../helpers/HttpError.js';
import User from '../model/user-model.js';

const { SECRET_KEY } = process.env;

export const register = async (req, res, next) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();

  try {
    const user = await User.findOne({ email: normalizedEmail });

    if (user) {
      throw HttpError(409, 'Email in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    const responseBody = {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    };

    if (!newUser) {
      throw HttpError(400, 'Not Found');
    }

    res.status(201).json(responseBody);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();

  try {
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      throw HttpError(401, 'Email or password is wrong');
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw HttpError(401, 'Email or password is wrong');
    }

    const payload = {
      id: user._id,
    };

    const token = Jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });

    const responseBody = {
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    };

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json(responseBody);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  // console.log(req.user);
  // res.json({ message: 'logout endpoint test' });

  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });
    res.json('user logaut');

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const current = async (req, res, next) => {
  try {
    const current = await User.findById(req.user.id);
    const responseBody = {
      email: current.email,
      subscription: current.subscription,
    };
    res.json(responseBody);
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  // res.json('update router test');
  const { subscription } = req.body;
  try {
    const contact = await User.findById(req.user.id);
    const responseBody = {
      email: contact.email,
      subscription,
    };
    res.json(responseBody);
  } catch (error) {
    next(error);
  }
};
