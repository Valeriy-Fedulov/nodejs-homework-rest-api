import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const contactSchema = Schema({
  name: String,
});

const Contact = model("contact", contactSchema);

export default Contact;
