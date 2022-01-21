const addContact = async (req, res, next) => {
  const result = await addContact(req.body);
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
