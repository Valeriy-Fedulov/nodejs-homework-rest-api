import express from "express";
import { contactsValidation, statusValidation } from "../../models/index.js";
import { auth, ctrlWrapper } from "../../middlewares/index.js";

import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
  updateStatusContact,
} from "../../controllers/index.js";

const router = express.Router();

router.get("/", auth, ctrlWrapper(listContacts));
router.get("/:contactId", auth, ctrlWrapper(getContactById));
router.post("/", auth, contactsValidation, ctrlWrapper(addContact));
router.delete(
  "/:contactId",
  auth,
  contactsValidation,
  ctrlWrapper(removeContact)
);
router.put("/:contactId", auth, contactsValidation, ctrlWrapper(updateContact));
router.patch(
  "/:contactId/favorite",
  auth,
  statusValidation,
  ctrlWrapper(updateStatusContact)
);

export default router;
