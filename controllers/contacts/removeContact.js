import { Contact } from "../../models/index.js";

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
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
};

export default removeContact;
