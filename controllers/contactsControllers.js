import * as contactsService from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';
import Contact from '../model/contact-model.js';

export const getAllContacts = async (req, res, next) => {
  // try {
  //   const result = await contactsService.listContacts();
  //   res.status(200).json(result);
  //   if (!result) {
  //     throw HttpError(401, 'Bad Request');
  //   }
  // } catch (error) {
  //   next(error);
  // }
  const contacts = await Contact.find();
  res.status(200).json({
    message: 'Get all contacts',
    contacts,
  });
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
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
    const result = await contactsService.removeContact(id);

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
  // try {
  //   const result = await contactsService.addContact({ name, email, phone });
  //   if (!result) {
  //     throw HttpError(400, 'Not Found');
  //   }
  //   res.status(201).json(result);
  // } catch (error) {
  //   console.log(error);
  //   next(error);
  // }

  const newContact = await Contact.create(req.body);
  res.status(201).json({
    message: 'Succsess',
    conttact: newContact,
  });
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
