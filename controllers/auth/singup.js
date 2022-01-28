import { User } from "../../models/index.js";
import Conflict from "http-errors";
import bcrypt from "bcryptjs";

const singup = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({ password: hashPassword, email });
  res.status(201).json({
    message: "User add",
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

export default singup;
