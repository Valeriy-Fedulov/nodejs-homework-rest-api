import express from "express";
import contactsValidation from "../../middlewares/validation.js";
import createError from "http-errors";

import ctrlWrapper from "../../middlewares/ctrlWrapper.js";
import 

import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../../model/index.js";

const router = express.Router();

router.get("/");

router.get("/:contactId");

router.post("/", contactsValidation);

router.delete("/:contactId");

router.put("/:contactId", contactsValidation);

export default router;
