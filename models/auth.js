import pkg from "mongoose";
import Joi from "joi";
import bcrypt from "bcryptjs";

const { Schema, model } = pkg;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const authValidation = (req, res, next) => {
  const joiSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    subscription: Joi.string().valid("starter", "pro", "business"),
    token: Joi.string().token(),
  });

  const validationResult = joiSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: `Error ${validationResult.error}`,
    });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const joiSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
  });

  const validationResult = joiSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: `Error ${validationResult.error}`,
    });
  }
  next();
};

const User = model("user", userSchema);

export { User, authValidation, loginValidation };
