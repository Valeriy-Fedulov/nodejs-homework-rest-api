import { User } from "../../models/index.js";

const updateAvatar = async (req, res, next) => {
  const { avatarURL } = req.body;
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { avatarURL }, { new: avatarURL });
  res.status(200).json({
    message: "Avatar update",
    status: "success",
    code: 200,
    data: {
      avatarURL,
    },
  });
};

export default updateAvatar;
