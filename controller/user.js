const { User } = require("../service/schemas/user");

const getCurrentUser = async (req, res, next) => {
  const { email, subscription } = req.user;
  try {
    res.status(200).json({
      email: email,
      subscription: subscription,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCurrentUser,
};
