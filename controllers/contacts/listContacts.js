import { Contact } from "../../models/contact.js";

const listContacts = async (req, res, next) => {
  const result = await Contact.find({});
  res.json({
    message: "List contacts",
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

export default listContacts;
