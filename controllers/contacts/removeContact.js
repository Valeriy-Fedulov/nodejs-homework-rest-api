const removeContact = async (req, res, next) => {
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
};

export default removeContact;
