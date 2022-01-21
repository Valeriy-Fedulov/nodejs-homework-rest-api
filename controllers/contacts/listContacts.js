const listContacts = async (req, res, next) => {
  const result = await listContacts();
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
