import { User } from "../../models/index.js";
import Jimp from "jimp";

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const avatarURL = req.file.path;

  Jimp.read(avatarURL)
    .then((imgAvatar) => {
      return imgAvatar.resize(250, 250).write(avatarURL);
    })
    .catch((err) => {
      next(err);
    });

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
