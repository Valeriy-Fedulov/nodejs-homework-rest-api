import { Contact } from "../../models/index.js";

const addContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json({
    message: "Contact add",
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

export default addContact;
