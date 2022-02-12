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

  const result = await User.create({
    name,
    password: hashPassword,
    email,
    avatarURL,
  });
  res.status(201).json({
    message: "User singup",
    status: "success",
    code: 201,
    data: {
      user: { email, subscription: result.subscription },
    },
  });

  const verificationToken = uuidv4();

  await Verify.create({
    userId: user.__id,
    verificationToken,
  });
  res.status(201).json({
    message: "VerificationToken create",
    status: "success",
    code: 201,
    date: {
      userId,
    },
  });

  const linkVerify = `/auth/verify/:${verificationToken}`;

  const msg = {
    to: email,
    from: "valerafm.vofm@ukr.net",
    subject: "Thank you for registration!",
    text: `Please verify your account by clicking the link: http://${req.headers.host}${linkVerify} Thank You!`,
    html: `<h1>Please verify your account by clicking the link: </h1><a href="http://${req.headers.host}${linkVerify}">http://${req.headers.host}${linkVerify}</a> <h2>Thank You!</h2>`,
  };

  await sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

export default singup;
