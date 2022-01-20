import express from "express";
import contactsValidation from "../../middlewares/validationMiddleware.js";
import createError from "http-errors";

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
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result)
      throw new createError(404, `Contact with id=${contactId} not found`);
    res.status(200).json({
      message: `Contact id=${contactId} found`,
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
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
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result)
      throw new createError(404, `Contact with id=${contactId} not found`);
    res.status(200).json({
      message: "Contact deleted",
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", contactsValidation, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!req.body) {
      throw new createError(400, "Missing fields");
    } else {
      const result = await updateContact(contactId, req.body);
      if (!result)
        throw new createError(404, `Contact with id=${contactId} not found`);
      res.status(200).json({
        message: `Contact id=${contactId} update`,
        status: "success",
        code: 200,
        data: {
          result,
        },
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
