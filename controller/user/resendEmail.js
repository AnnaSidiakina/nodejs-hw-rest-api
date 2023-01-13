const { BadRequest, Unauthorized } = require("http-errors");
const { User } = require("../../service/schemas/user");
const sendEmail = require("../../helpers/sendEmail");

const resendEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequest("missing required field email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized("Email not found");
  }

  if (user.verify) {
    throw BadRequest("Verification has already been passed");
  }

  // const mail = {
  //   to: email,
  //   subject: "Confirm registration",
  //   html: "<p>Confirm your email address</p>",
  // };
  const verificationToken = user.verificationToken;
  await sendEmail(email, verificationToken);

  res.json({ message: "Verification email sent" });
};
module.exports = resendEmail;
