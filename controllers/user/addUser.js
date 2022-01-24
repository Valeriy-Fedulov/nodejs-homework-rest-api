import { User } from "../../models/index.js";

const addUser = async (req, res, next) => {
  try {
    const result = await User.create(req.body);
    res.status(201).json({
      message: "User add",
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default addUser;
