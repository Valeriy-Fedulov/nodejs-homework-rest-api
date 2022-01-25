import pkg from "mongoose";
import Joi from "joi";

const { Schema, model } = pkg;

const codePassword = /^[a-zA-Z0-9]{3,30}$/;

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      match: codePassword,
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const userValidation = (req, res, next) => {
  const joiSchema = Joi.object({
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
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
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
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

export { User, userValidation, loginValidation };
