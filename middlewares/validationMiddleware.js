import Joi from "joi";

const contactsValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(100).required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    phone: Joi.number().integer().min(10).max(20).require(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      status: "error",
      code: 404,
      message: `Error ${validationResult.error.details}`,
    });
  }
  next();
};

export default contactsValidation;
