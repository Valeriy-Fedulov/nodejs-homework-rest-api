import Contact from "../../models/contact.js";
import createError from "http-errors";

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!req.body) {
      throw new createError(400, "Missing fields");
    } else {
      const result = await Contact.findByIdAndUpdate(contactId, req.body);
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
  // try {
  //   const { contactId } = req.params;
  //   if (!req.body) {
  //     throw new createError(400, "Missing fields");
  //   } else {
  //     const result = await updateContact(contactId, req.body);
  //     if (!result)
  //       throw new createError(404, `Contact with id=${contactId} not found`);
  //     res.status(200).json({
  //       message: `Contact id=${contactId} update`,
  //       status: "success",
  //       code: 200,
  //       data: {
  //         result,
  //       },
  //     });
  //   }
  // } catch (error) {
  //   next(error);
  // }
};

export default updateContact;