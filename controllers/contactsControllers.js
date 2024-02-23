import HttpError from '../helpers/HttpError.js';
import Contact from '../model/contact-model.js';

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.status(200).json(result);
    if (!result) {
      throw HttpError(401, 'Bad Request');
    }
  } catch (error) {
    next(error);
  }
};
export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      throw HttpError(404, 'Not Found');
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);

    if (!result) {
      throw HttpError(404, `Contact with ID:${id} not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  // const { name, email, phone } = req.body;

  try {
    const result = await Contact.create(req.body);

    if (!result) {
      throw HttpError(400, 'Not Found');
    }

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(id, { name, email, phone, favorite });
    if (!result) {
      throw HttpError(404, `Contact with ID:${id} not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;
    const updateStatus = await Contact.findByIdAndUpdate(id, { favorite }, { new: true });
    res.status(201).json({
      message: 'Succsess',
      contact: updateStatus,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Bad request',
    });
  }
};
