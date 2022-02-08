import { User } from "../../models/index.js";
import Unauthorized from "http-errors";
import jwt from "jsonwebtoken";

const verify = async (req, res, next) => {
  const { verificationToken } = req.params;
  await res.status(200).json({
    message: `Verification successful`,
    status: "success",
    code: 200,
    data: {
      user: { email, subscription: user.subscription },
    },
  });
};

export default verify;
