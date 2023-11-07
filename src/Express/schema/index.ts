import Joi from "joi";

const userSchemaItem = Joi.object({
  usr_name: Joi.string().required().min(3).max(12),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  role: Joi.string().required().valid("user", "admin"),
});

export const userSchema = Joi.array().min(1).items(userSchemaItem);

export const userUpdateSchema = Joi.object({
  id: Joi.number().required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  role: Joi.string().optional().valid("user", "admin"),
});

export const loginSchema = Joi.object({
  usr_name: Joi.string().required().min(3).max(12),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
});
