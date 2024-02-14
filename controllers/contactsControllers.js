import * as contactsService from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';

export const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.status(200).json(result);
};

export const getOneContact = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404, 'Not Found');
  }
  res.status(200).json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const result = await contactsService.addContact({ name, email, phone });
  if (!result) {
    throw HttpError(404, 'Not');
  }
  res.status(200).json(result);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;

  const result = await contactsService.updateContactById(id, req.body);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};
