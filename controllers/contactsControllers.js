import * as contactsService from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';

export const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.status(200).json(result);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    res.status(404).json({ message: 'Not Found' });
    throw HttpError(404, 'Not Found');
  }
  res.status(200).json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

export const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;

  try {
    const result = await contactsService.addContact({ name, email, phone });

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
    const result = await contactsService.updateContactById(id, req.body);
    if (!result) {
      throw HttpError(404, `Contact with ID:${id} not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
