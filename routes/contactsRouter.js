import express from 'express';

import validateBody from '../middlewares/validateBody.js';
import authenticate from '../middlewares/auth.js';

import {
  createContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
} from '../schemas/contactsSchemas.js';
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from '../controllers/contactsControllers.js';

import isValidId from '../middlewares/validateId.js';

const contactsRouter = express.Router();

contactsRouter.get('/', authenticate, getAllContacts);

contactsRouter.get('/:id', authenticate, isValidId, getOneContact);

contactsRouter.delete('/:id', authenticate, isValidId, deleteContact);

contactsRouter.post('/', authenticate, validateBody(createContactSchema), createContact);

contactsRouter.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(updateContactSchema),
  updateContact,
);

contactsRouter.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateBody(updateContactStatusSchema),
  updateStatusContact,
);

export default contactsRouter;
