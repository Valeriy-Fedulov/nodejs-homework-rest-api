import express from "express";
import contactsValidation from "../../middlewares/validationMiddleware.js";

import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../../model/index.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await listContacts();
  res.json({
    message: "List contacts",
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    res.status(404).json({
      message: `Contact with id=${contactId} not found`,
      status: "error",
      code: 404,
    });
  }
  res.status(200).json({
    message: `Contact id=${contactId} found`,
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
    message: "Contact add",
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
  if (!result) {
    res.status(404).json({
      message: `Contact with id=${contactId} not found`,
      status: "error",
      code: 404,
    });
  }
  res.status(200).json({
    message: "Contact deleted",
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
});

router.put("/:contactId", contactsValidation, async (req, res, next) => {
  const { contactId } = req.params;
  if (!req.body) {
    res.status(400).json({
      message: "Missing fields",
      status: "error",
      code: 400,
    });
  } else {
    const result = await updateContact(contactId, req.body);
    if (!result) {
      res.status(404).json({
        message: `Contact with id=${contactId} not found`,
        status: "error",
        code: 404,
      });
    }
    res.status(200).json({
      message: `Contact id=${contactId} update`,
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  }
});

export default router;
