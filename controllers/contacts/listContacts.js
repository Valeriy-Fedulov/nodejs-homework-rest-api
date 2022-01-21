import Contact from "../../models/contact.js";
import createError from "http-errors";

const listContacts = async (req, res, next) => {
  console.log("listContacts");
  const result = await Contact.find({});
  res.json({
    message: "List contacts",
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
// const listContacts = async (req, res, next) => {
//   const result = await listContacts();
//   res.json({
//     message: "List contacts",
//     status: "success",
//     code: 200,
//     data: {
//       result,
//     },
//   });
// };

export default listContacts;
