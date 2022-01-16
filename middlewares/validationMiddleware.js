import Joi from "joi";

const contactsValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(100).required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    phone: Joi.number().required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: `Error ${validationResult.error}`,
    });
  }
  next();
};

export default contactsValidation;
