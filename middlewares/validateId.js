const { isValidObjectId } = require("mongoose");

const validateId = (req, res, next) => {
  const contactId = req.params.contactId;
  const result = isValidObjectId(contactId);
  if (!result) {
    next({ status: 404, message: "Not found" });
  }
  next();
};

module.exports = {
  validateId,
};
