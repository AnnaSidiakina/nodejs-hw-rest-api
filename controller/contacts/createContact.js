const { BadRequest } = require("http-errors");
const { validationSchema } = require("../../service/schemas/contact");
const { Contact } = require("../../service/schemas/contact");

const create = async (req, res, next) => {
  const body = req.body;
  const { _id } = req.user;

  const { error } = validationSchema.validate(body);
  if (error) {
    throw BadRequest("missing required name field");
  }

  const data = await Contact.create({ ...body, owner: _id });
  res.status(201).json(data);
};

module.exports = create;
