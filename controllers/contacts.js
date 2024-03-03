import HttpError from '../helpers/HttpError.js';
import Contact from '../model/contact-model.js';

const getAllContacts = async (req, res, next) => {
  const { page, limit, favorite } = req.query;
  const filter = { owner: req.user.id };

  if (favorite !== undefined) {
    filter.favorite = favorite;
  }

  try {
    const contact = await Contact.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(contact);
    if (!contact) {
      throw HttpError(401, 'Bad Request');
    }
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      throw HttpError(404, 'Not Found');
    }

    if (contact.owner.toString() !== req.user.id) {
      throw HttpError(404, 'Not Found');
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const { id: ownerId } = req.user;

  try {
    const contact = await Contact.findByIdAndDelete(id).where('owner').equals(ownerId);

    if (!contact) {
      throw HttpError(404, 'Not Found');
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create({ ...req.body, owner: req.user.id });

    if (!contact) {
      throw HttpError(400, 'Not Found');
    }

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { id: ownerId } = req.user;
  const { name, email, phone, favorite } = req.body;

  try {
    const contact = await Contact.findByIdAndUpdate(
      id,
      { name, email, phone, favorite },
      { new: true },
    )
      .where('owner')
      .equals(ownerId);

    if (!contact) {
      throw HttpError(404, `Not found`);
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { id: ownerId } = req.user;

  try {
    const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true })
      .where('owner')
      .equals(ownerId);

    if (!contact) {
      throw HttpError(404, `Not found`);
    }

    res.status(200).json(contact);
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
