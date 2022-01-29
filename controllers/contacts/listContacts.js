import { Contact } from "../../models/index.js";

const listContacts = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
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
