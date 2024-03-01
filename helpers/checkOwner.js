import Contact from '../model/contact-model.js';
import HttpError from '../helpers/HttpError.js';

export const matchOwner = async (contactId, ownerId) => {
  try {
    const contact = await Contact.findById(contactId);

    if (contact.owner.toString() !== ownerId) {
      throw HttpError(404, 'Not Found');
    }
  } catch (error) {}
};
