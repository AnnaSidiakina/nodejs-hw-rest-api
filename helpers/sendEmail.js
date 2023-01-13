const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRIG_API_KEY } = process.env;
const { EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRIG_API_KEY);

const sendEmail = async (email, verificationToken) => {
  const mail = {
    to: email,
    from: EMAIL_FROM,
    cc: "mavex99890@tohup.com",
    subject: "Please, confirm email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm email</a>`,
  };
  try {
    await sgMail.send(mail);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
