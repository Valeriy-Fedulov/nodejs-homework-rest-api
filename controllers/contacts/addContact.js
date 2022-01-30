import { Contact } from "../../models/index.js";

const addContact = async (req, res, next) => {
  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });
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
