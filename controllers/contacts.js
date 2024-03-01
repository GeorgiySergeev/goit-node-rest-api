import HttpError from '../helpers/HttpError.js';
import Contact from '../model/contact-model.js';

import { matchOwner } from '../helpers/checkOwner.js';

const getAllContacts = async (req, res, next) => {
  const { page, limit, favorite } = req.query;
  const filter = { owner: req.user.id };

  if (favorite !== undefined) {
    filter.favorite = favorite;
  }

  try {
    const result = await Contact.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(result);
    if (!result) {
      throw HttpError(401, 'Bad Request');
    }
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      throw HttpError(404, 'Not Found');
    }

    if (result.owner.toString() !== req.user.id) {
      throw HttpError(404, 'Not Found');
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    matchOwner(id, req.user.id);

    const result = await Contact.findByIdAndDelete(id);

    if (!result) {
      throw HttpError(404, `Contact with ID:${id} not found`);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const result = await Contact.create({ ...req.body, owner: req.user.id });

    if (!result) {
      throw HttpError(400, 'Not Found');
    }

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    matchOwner(id, req.user.id);

    const { name, email, phone, favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(
      id,
      { name, email, phone, favorite },
      { new: true },
    );
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    matchOwner(id, req.user.id);

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      throw HttpError(404, `Not found`);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const ctrl = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
};
export default ctrl;
