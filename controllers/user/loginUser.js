import { User } from "../../models/index.js";

const loginUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await User.findById(userId);
    if (!result)
      throw new createError(404, `Contact with id=${userId} not found`);
    res.status(200).json({
      message: `Contact id=${userId} found`,
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

export default loginUser;
