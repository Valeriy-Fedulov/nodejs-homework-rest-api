import { User } from "../../models/index.js";

const logoutUser = async (req, res, next) => {
  const { userId } = req.params;
  const result = await User.findByIdAndRemove(userId);
  if (!result) throw new createError(404, `User with id=${userId} not found`);
  res.status(200).json({
    message: "User deleted",
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

export default logoutUser;
