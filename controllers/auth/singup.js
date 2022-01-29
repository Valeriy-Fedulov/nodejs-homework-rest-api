import { User } from "../../models/index.js";
import Conflict from "http-errors";
import bcrypt from "bcryptjs";

const singup = async (req, res, next) => {
  const { name, password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({ name, password: hashPassword, email });
  res.status(201).json({
    message: "User singup",
    status: "success",
    code: 201,
    data: {
      user: { email, subscription: result.subscription },
    },
  });
};

export default singup;
