const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const user = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: { type: String },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const handleError = (error, data, next) => {
  const { name, code } = error;
  if (name === "ValidationError") {
    error.status = 400;
  }
  next();
};
user.post("save", handleError);

const validationSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const validationSuscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
});

const User = mongoose.model("user", user);

module.exports = { User, validationSchema, validationSuscriptionSchema };
