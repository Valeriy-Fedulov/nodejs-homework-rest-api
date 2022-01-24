import express from "express";
import {
  contactsValidation,
  statusValidation,
  userValidation,
  loginValidation,
} from "../../models/index.js";

import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
  updateStatusContact,
  addUser,
  loginUser,
  logoutUser,
  getUser,
} from "../../controllers/index.js";

const router = express.Router();

router.get("/", listContacts);
router.get("/:contactId", getContactById);
router.post("/", contactsValidation, addContact);
router.delete("/:contactId", contactsValidation, removeContact);
router.put("/:contactId", contactsValidation, updateContact);
router.patch("/:contactId/favorite", statusValidation, updateStatusContact);

router.post("/users/singup", userValidation, addUser);
router.post("/users/login", loginValidation, loginUser);
router.post("/users/logout", logoutUser);
router.post("/users/current", getUser);

export default router;
