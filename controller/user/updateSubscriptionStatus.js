const { User } = require("../../service/schemas/user");
const { createError } = require("../../helpers/error");
const { validationSuscriptionSchema } = require("../../service/schemas/user");
const { BadRequest } = require("http-errors");

const updateSubscriptionStatus = async (req, res, next) => {
  const { _id } = req.user;
  const { error } = validationSuscriptionSchema.validate(req.body);
  if (error) {
    throw BadRequest("missing field favorite");
  }
  const data = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!data) {
    throw createError(404, "Not found");
  }
  res.status(200).json(data);
};

module.exports = updateSubscriptionStatus;
