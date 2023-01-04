const { User } = require("./schemas/user");

const signupUser = async (email) => {
  const user = await User.findOne(email);
};

module.exports = {
  signupUser,
};
