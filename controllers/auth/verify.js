import { User, Verify } from "../../models/index.js";
import NotFound from "http-errors";

const verify = async (req, res, next) => {
  const { verificationToken } = req.params;
  const verification = await Verify.findOne({ verificationToken });

  if (!verification) {
    throw new NotFound("Invalide or expired confirmation verificationToken");
  }

  const user = await User.findById(verification.userId);
  if (!user) {
    throw new NotFound("No user found");
  }

  const confirmed = true;
  await User.findByIdAndUpdate(
    verification.userId,
    { confirmed },
    { new: confirmed }
  );
  await Verify.findOneAndRemove({ verificationToken });

  await res.status(200).json({
    message: `Verification successful`,
    status: "success",
    code: 200,
    data: {
      userId: user.__id,
    },
  });
};

export default verify;
