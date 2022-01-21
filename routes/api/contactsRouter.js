import express from "express";
import contactsValidation from "../../middlewares/validation.js";
import createError from "http-errors";

import ctrlWrapper from "../../middlewares/ctrlWrapper.js";

import listContacts from "../../controllers/contacts/listContacts.js";
import getContactById from "../../controllers/contacts/getContactById.js";
import removeContact from "../../controllers/contacts/removeContact.js";
import addContact from "../../controllers/contacts/addContact.js";
import updateContact from "../../controllers/contacts/updateContact.js";

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", ctrlWrapper(getContactById));

router.post("/", contactsValidation, ctrlWrapper(addContact));

router.delete("/:contactId", ctrlWrapper(removeContact));

router.put("/:contactId", contactsValidation, ctrlWrapper(updateContact));

export default router;
