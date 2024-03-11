import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import Jimp from 'jimp';
import 'dotenv/config.js';

import HttpError from '../helpers/HttpError.js';
import User from '../model/user-model.js';

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();

  try {
    const user = await User.findOne({ email: normalizedEmail });

    if (user) {
      throw HttpError(409, 'Email in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({ email, password: hashedPassword, avatarURL });

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

const login = async (req, res, next) => {
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

const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const current = async (req, res, next) => {
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

const updateSubscription = async (req, res, next) => {
  const { subscription } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { subscription });
    const responseBody = {
      email: user.email,
      subscription,
    };
    res.json(responseBody);
  } catch (error) {
    next(error);
  }
};

const uploadAvatar = async (req, res, next) => {
  const { id } = req.user;

  try {
    if (!req.file) {
      throw HttpError(400, 'File not uploaded');
    }
    const { path: tempPath, filename } = req.file;

    const resizeAvatar = await Jimp.read(tempPath);
    resizeAvatar.resize(250, 250).write(tempPath);

    await fs.rename(tempPath, path.join(process.cwd(), 'public/avatars', filename));

    const avatarURL = path.join('/avatars', filename);

    const user = await User.findByIdAndUpdate(id, { avatarURL }, { new: true });
    if (!user) {
      throw HttpError(404, 'User not found');
    }
    res.json({ avatarURL: user.avatarURL });
  } catch (error) {
    next(error);
  }
};

const getAvatar = async (req, res, next) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id);
    if (!user) {
      throw new HttpError(404, 'User not found');
    }

    if (user.avatarURL === null) {
      throw new HttpError(404, 'Avatar not found');
    }

    res.sendFile(path.join(process.cwd(), 'public', user.avatarURL));
  } catch (error) {
    next(error);
  }
};

const ctrl = {
  register,
  login,
  logout,
  current,
  updateSubscription,
  uploadAvatar,
  getAvatar,
};

export default ctrl;
