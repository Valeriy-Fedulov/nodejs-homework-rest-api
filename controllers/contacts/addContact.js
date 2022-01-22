import Contact from "../../models/contact.js";

const addContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
    res.status(201).json({
      message: "Contact add",
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
  // const result = await addContact(req.body);
  // res.status(201).json({
  //   message: "Contact add",
  //   status: "success",
  //   code: 201,
  //   data: {
  //     result,
  //   },
  // });
};

export default addContact;
