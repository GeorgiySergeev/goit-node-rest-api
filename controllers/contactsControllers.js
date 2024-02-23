import Contact from '../model/contact-model.js';

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      message: 'Get all contacts',
      contacts,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await Contact.findById(id);
    res.status(200).json({
      message: 'Get contacts by ID',
      user,
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(404).json({
      error: 'Contact is not found',
    });
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await Contact.findByIdAndDelete(id);
    res.status(200).json({
      message: 'Contacts deleted',
      deletedUser,
    });
  } catch (error) {
    res.status(404).json({
      error: 'Contact is not found',
    });
  }
};

export const createContact = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json({
      message: 'Succsess',
      contact: newContact,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Bad request',
    });
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, favorite } = req.body;
    const updateContact = await Contact.findByIdAndUpdate(id, { name, email, phone, favorite });
    res.status(201).json({
      message: 'Succsess',
      contact: updateContact,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Bad request',
    });
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
