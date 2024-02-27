import express from 'express';
import validateBody from '../middlewares/validateBody.js';
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

contactsRouter.get('/', getAllContacts);

contactsRouter.get('/:id', isValidId, getOneContact);

contactsRouter.delete('/:id', isValidId, deleteContact);

contactsRouter.post('/', validateBody(createContactSchema), createContact);

contactsRouter.put('/:id', isValidId, validateBody(updateContactSchema), updateContact);

contactsRouter.patch(
  '/:id/favorite',
  isValidId,
  validateBody(updateContactStatusSchema),
  updateStatusContact,
);

export default contactsRouter;
