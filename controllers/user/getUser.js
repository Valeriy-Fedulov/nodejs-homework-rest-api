import { User } from "../../models/index.js";

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await User.findById(userId);
    if (!result) throw new createError(404, `User with id=${userId} not found`);
    res.status(200).json({
      message: `User id=${userId} found`,
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

export default getUser;
