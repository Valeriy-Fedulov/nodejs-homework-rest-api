import Contact from "../../models/contact.js";

const getContactById = async (req, res, next) => {
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
};

export default getContactById;
