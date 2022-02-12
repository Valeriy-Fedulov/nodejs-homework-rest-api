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

const Verify = model("verify", verifySchema);

export default Verify;
