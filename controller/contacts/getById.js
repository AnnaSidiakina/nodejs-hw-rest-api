const { createError } = require("../../helpers/error");
const { Contact } = require("../../service/schemas/contact");

const getById = async (req, res, next) => {
  const contactId = req.params.contactId;

  const data = await Contact.findById(contactId);
  if (!data) {
    throw createError(404, "Not found");
  }
  res.status(200).json(data);
};

module.exports = getById;
