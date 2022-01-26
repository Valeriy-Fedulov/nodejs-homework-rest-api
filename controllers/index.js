import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
  updateStatusContact,
} from "./contacts/index.js";

import { singup, login, logoutUser } from "./auth/index.js";

import getCurrent from "./users/index.js";

export {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
  updateStatusContact,
  singup,
  login,
  logoutUser,
  getCurrent,
};
