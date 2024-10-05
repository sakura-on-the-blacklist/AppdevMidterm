const Joi = require("joi");

//joi creates a model/certain rules for the input to avoid mistakenly inputting invalid values

//for REGISTRATION
const registerModel = Joi.object({
  //username must be string, 3 characters long, required
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(1).required(),
});

//for LOGIN
const loginModel = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(1).required(),
});

module.exports = { registerModel, loginModel };
