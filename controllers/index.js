import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
  updateStatusContact,
} from "./contacts/index.js";

import { singup, login, logout, verify } from "./auth/index.js";

import { getCurrent, updateSubscription, updateAvatar } from "./users/index.js";

export {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
  updateStatusContact,
  singup,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
  verify,
};
