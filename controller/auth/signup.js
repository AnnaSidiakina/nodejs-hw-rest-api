const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../../service/schemas/user");
const { validationSchema } = require("../../service/schemas/user");
const sendEmail = require("../../helpers/sendEmail");
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
  const verificationToken = uuidv4();
  const data = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  // const mail = {
  //   to: email,
  //   subject: "Confirm email",
  //   html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm email</a>`,
  // };
  await sendEmail(email, verificationToken);
  res.status(201).json({
    user: {
      email: data.email,
      subscription: "starter",
      avatarURL,
      verificationToken,
    },
  });
};

module.exports = signup;
