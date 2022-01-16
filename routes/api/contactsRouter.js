import express from "express";
import contactsValidation from "../../middlewares/validationMiddleware.js";

import {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
} from "../../model/index.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await listContacts();
  res.json({
    message: "template message",
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getById(contactId);
  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id=${contactId} not found`,
    });
  }
  res.json({
    message: "template message",
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
});

router.post("/", contactsValidation, async (req, res, next) => {
  const result = await addContact(req.body);
  res.status(201).json({
    message: "template message",
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  res.status(200).json({
    message: "template message",
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
});

router.put("/:contactId", contactsValidation, async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  res.status(200).json({
    message: "template message",
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
});

export default router;
