import mongoose from "mongoose";
import Joi from "joi";

const { Schema, model } = mongoose;

const codePhone = /^((8|\+7)[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{5,10}$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
      match: codePhone,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const contactsValidation = (req, res, next) => {
  const joiSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    phone: Joi.string().pattern(codePhone).required(),
    favorite: Joi.bool(),
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

const statusValidation = (req, res, next) => {
  const joiSchema = Joi.object({ favorite: Joi.bool().required() });

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

const Contact = model("contact", contactSchema);

export { Contact, contactsValidation, statusValidation };
