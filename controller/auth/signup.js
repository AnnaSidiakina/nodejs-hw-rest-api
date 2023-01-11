const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../service/schemas/user");
const { validationSchema } = require("../../service/schemas/user");
const { Conflict, BadRequest } = require("http-errors");

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const { error } = validationSchema.validate(req.body);
  if (error) {
    throw BadRequest("missing required name field");
  }
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const data = await User.create({ email, password: hashPassword, avatarURL });
  res.status(201).json({
    user: {
      email: data.email,
      subscription: "starter",
      avatarURL,
    },
  });
};

module.exports = signup;
