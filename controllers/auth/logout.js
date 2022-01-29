import { User } from "../../models/index.js";

const logout = async (req, res, next) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).json({});
};

export default logout;
