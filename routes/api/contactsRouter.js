import express from "express";
import { contactsValidation, ctrlWrapper } from "../../middlewares/index.js";

import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
  updateStatusContact,
} from "../../controllers/contacts/index.js";

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", contactsValidation, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", contactsValidation, updateContact);

router.patch("/:contactId/favorite", contactsValidation, updateStatusContact);

export default router;
