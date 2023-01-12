const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRIG_API_KEY } = process.env;

sgMail.setApiKey(SENDGRIG_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "fruktik@gmail.com" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
