import express from "express";
import { v4 } from "uuid";
import contactsValidation from "../../middlewares/validationMiddleware.js";

// import contactsOperations from "../../contacts.js";

const contacts = [
  {
    id: "1",
    name: "Allen Raymond",
    email: "nulla.ante@vestibul.co.uk",
    phone: "(992) 914-3792",
  },
  {
    id: "2",
    name: "Chaim Lewis",
    email: "dui.in@egetlacus.ca",
    phone: "(294) 840-6685",
  },
  {
    id: "4",
    name: "Wylie Pope",
    email: "est@utquamvel.net",
    phone: "(692) 802-2949",
  },
];

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({
    message: "template message",
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = contacts.find((item) => item.id === contactId);
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
  const newContact = { ...req.body, id: v4() };
  contacts.push(newContact);
  res.status(201).json({
    message: "template message",
    status: "success",
    code: 201,
    data: {
      result: newContact,
    },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = contacts.find((item) => item.id !== contactId);
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
  const newContact = { ...req.body };
  contacts.forEach((item) => {
    if (item.id === contactId) {
      item.name = newContact.name;
      item.email = newContact.email;
      item.phone = newContact.phone;
    }
  });
  res.status(200).json({
    message: "template message",
    status: "success",
    code: 200,
    data: {
      result: newContact,
    },
  });
});

export default router;
