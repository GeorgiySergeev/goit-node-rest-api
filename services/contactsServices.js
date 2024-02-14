const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const CONTACT_PATH = path.join(__dirname, 'db', 'contacts.json');

const getAllContacts = async () => {
  const data = await fs.readFile(CONTACT_PATH, { encoding: 'utf-8' });

  return JSON.parse(data);
};

const getContactById = async (id) => {
  const data = await getAllContacts();

  const contact = data.find((el) => el.id === id);
  return contact || null;
};

const addContact = async (contact) => {
  const contactsList = await getAllContacts();

  const newContact = {
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    id: nanoid(),
  };
  contactsList.push(newContact);

  await fs.writeFile(CONTACT_PATH, JSON.stringify(contactsList, null, 2));
  return newContact;
};

const removeContact = async (id) => {
  const contactsList = await getAllContacts();

  const index = contactsList.findIndex((el) => el.id === id);
  if (index === -1) return null;

  const [removedContact] = contactsList.splice(index, 1);

  await fs.writeFile(CONTACT_PATH, JSON.stringify(contactsList, null, 2));
  return removedContact || null;
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
};
