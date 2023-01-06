const { createError } = require("../../helpers/error");
const { Contact } = require("../../service/schemas/contact");

const deleteContact = async (req, res, next) => {
  const contactId = req.params.contactId;

  const data = await Contact.findByIdAndDelete(contactId);
  if (!data) {
    throw createError(404, "Not found");
  }

  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteContact;
