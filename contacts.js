import fs from "fs/promises";
import path from "path";
import { v4 } from "uuid";

const contactsPath = path.join("./db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const writeContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeCont] = contacts.splice(idx, 1);
  await writeContacts(contacts);
  return removeCont;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: v4() };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, name, email, phone) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { name, email, phone, id: contactId };
  await writeContacts(contacts);
  return contacts[idx];
};

export default {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
