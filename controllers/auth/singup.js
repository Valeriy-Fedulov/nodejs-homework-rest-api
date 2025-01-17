import { User, Verify } from "../../models/index.js";
import Conflict from "http-errors";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import { v4 as uuidv4 } from "uuid";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const singup = async (req, res, next) => {
  const { name, password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email, { s: 250 });

  const verificationToken = uuidv4();
  const linkVerify = `/auth/verify/:${verificationToken}`;

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
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });

  const result = await User.create({
    name,
    password: hashPassword,
    email,
    avatarURL,
  });

  await Verify.create({
    userId: result._id,
    verificationToken,
  });

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
