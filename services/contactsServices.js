import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';

const CONTACT_PATH = path.resolve('db', 'contacts.json');

export const listContacts = async () => {
  const data = await fs.readFile(CONTACT_PATH, { encoding: 'utf-8' });

  return JSON.parse(data);
};

export const getContactById = async (id) => {
  const data = await listContacts();

  const contact = data.find((el) => el.id === id);
  return contact || null;
};

export const addContact = async (contact) => {
  const contactsList = await listContacts();

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

export const removeContact = async (id) => {
  const contactsList = await listContacts();

  const index = contactsList.findIndex((el) => el.id === id);
  if (index === -1) return null;

  const [removedContact] = contactsList.splice(index, 1);

  await fs.writeFile(CONTACT_PATH, JSON.stringify(contactsList, null, 2));
  return removedContact || null;
};

export const updateContactById = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...data };
  await fs.writeFile(CONTACT_PATH, JSON.stringify(contacts, null, 2));
  return contacts[index];
};
