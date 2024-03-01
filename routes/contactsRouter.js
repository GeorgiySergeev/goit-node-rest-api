import express from 'express';

import validateBody from '../middlewares/validateBody.js';
import authenticate from '../middlewares/auth.js';
import ctrl from '../controllers/contacts.js';

import {
  createContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
} from '../schemas/contactsSchemas.js';

import isValidId from '../middlewares/validateId.js';

const contactsRouter = express.Router();

contactsRouter.get('/', authenticate, ctrl.getAllContacts);

contactsRouter.get('/:id', authenticate, isValidId, ctrl.getOneContact);

contactsRouter.delete('/:id', authenticate, isValidId, ctrl.deleteContact);

contactsRouter.post('/', authenticate, validateBody(createContactSchema), ctrl.createContact);

contactsRouter.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(updateContactSchema),
  ctrl.updateContact,
);

contactsRouter.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateBody(updateContactStatusSchema),
  ctrl.updateStatusContact,
);

export default contactsRouter;
