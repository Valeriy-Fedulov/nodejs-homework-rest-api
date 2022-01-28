import { User } from "../../models/index.js";

const getCurrent = async (req, res, next) => {
  const result = req.user;
  res.status(200).json({
    message: `User current`,
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

export default getCurrent;
