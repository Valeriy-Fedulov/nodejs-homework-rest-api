const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    message: `Current user`,
    status: "success",
    code: 200,
    data: {
      email,
      subscription,
    },
  });
};

export default getCurrent;
