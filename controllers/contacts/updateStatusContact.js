import { Contact } from "../../models/index.js";
import createError from "http-errors";

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (!req.body) {
    throw new createError(400, "Missing field favorite");
  } else {
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
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
};

export default updateStatusContact;
