import express from "express";
import { contactsValidation, statusValidation } from "../../models/index.js";
import { ctrlWrapper } from "../../middlewares/index.js";

import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
  updateStatusContact,
} from "../../controllers/index.js";

const router = express.Router();

router.get("/", ctrlWrapper(listContacts));
router.get("/:contactId", ctrlWrapper(getContactById));
router.post("/", contactsValidation, ctrlWrapper(addContact));
router.delete("/:contactId", contactsValidation, ctrlWrapper(removeContact));
router.put("/:contactId", contactsValidation, ctrlWrapper(updateContact));
router.patch(
  "/:contactId/favorite",
  statusValidation,
  ctrlWrapper(updateStatusContact)
);

export default router;
