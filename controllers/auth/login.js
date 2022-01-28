import { User } from "../../models/index.js";
import Unauthorized from "http-errors";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password))
    throw new Unauthorized("Email or password is wrong");

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  res.status(200).json({
    message: `Login`,
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

export default login;
