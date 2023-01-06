const { BadRequest } = require("http-errors");
const { updateFavoriteSchema } = require("../../service/schemas/contact");
const { createError } = require("../../helpers/error");
const { Contact } = require("../../service/schemas/contact");

const updateStatusContact = async (req, res, next) => {
  const { error } = updateFavoriteSchema.validate(req.body);
  if (error) {
    throw BadRequest("missing field favorite");
  }
  const contactId = req.params.contactId;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!data) {
    throw createError(404, "Not found");
  }
  res.status(200).json(data);
};

module.exports = updateStatusContact;
