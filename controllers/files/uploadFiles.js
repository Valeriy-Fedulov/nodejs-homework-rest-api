const uploadFiles = async (req, res, next) => {
  res.status(200).json({
    message: "Files upload",
    status: "success",
    code: 200,
  });
};

export default uploadFiles;
