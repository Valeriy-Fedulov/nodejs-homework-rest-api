import mongoose from "mongoose";
import Joi from "joi";

const { Schema, model } = mongoose;

const verifySchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    verify: {
      type: Boolean,
      default: true,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const verifyValidation = (req, res, next) => {
  const joiSchema = Joi.object({
    userId: Joi.string().required(),
    verify: Joi.boolean(),
    verificationToken: Joi.string().required(),
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

const Verify = model("verify", verifySchema);

export { Verify, verifyValidation };
