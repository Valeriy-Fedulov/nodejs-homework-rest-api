import { User } from "../../models/index.js";
import Unauthorized from "http-errors";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email, confirmed: true });
  if (!user || !user.comparePassword(password))
    throw new Unauthorized("Email or password is wrong");

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    message: `User login`,
    status: "success",
    code: 200,
    data: {
      token,
      user: { email, subscription: user.subscription },
    },
  });
};

export default login;
