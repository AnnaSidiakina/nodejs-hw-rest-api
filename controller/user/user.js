const { User } = require("../../service/schemas/user");

const getCurrentUser = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email: email,
    subscription: subscription,
  });
};

module.exports = getCurrentUser;
