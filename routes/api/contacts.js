import express from "express";
import { contactsValidation, statusValidation } from "../../models/index.js";

import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
  updateStatusContact,
} from "../../controllers/index.js";

const router = express.Router();

router.get("/", listContacts);
router.get("/:contactId", getContactById);
router.post("/", contactsValidation, addContact);
router.delete("/:contactId", contactsValidation, removeContact);
router.put("/:contactId", contactsValidation, updateContact);
router.patch("/:contactId/favorite", statusValidation, updateStatusContact);

export default router;
