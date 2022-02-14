import { User, Verify } from "../../models/index.js";
import NotFound from "http-errors";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sentVerify = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound("No user found");
  }

  if (user.confirmed) {
    throw new NotFound("Verification has already been passed");
  }
  const userId = user._id;
  const verification = await Verify.findOne({ userId });

  const linkVerify = `/auth/verify/:${verification.verificationToken}`;

  const msg = {
    to: email,
    from: "valerafm.vofm@ukr.net",
    subject: "Thank you for registration!",
    text: `Please verify your account by clicking the link: http://${req.headers.host}${linkVerify} Thank You!`,
    html: `Please verify your account by clicking the link: <a href="http://${req.headers.host}${linkVerify}">confirm</a> Thank You!`,
  };

  await sgMail
    .send(msg)
    .then(() => {
      console.log("Verification email sent");
    })
    .catch((error) => {
      console.error(error);
    });

  res.status(200).json({
    message: "Verification email sent",
    status: "success",
    code: 200,
  });
};

export default sentVerify;
