const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const contact = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    // owner: {
    //   type: SchemaTypes.ObjectId,
    //   ref: "user",
    // },
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
contact.post("save", handleError);

const validationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string(),
  favorite: Joi.bool(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = mongoose.model("contact", contact);

module.exports = { Contact, validationSchema, updateFavoriteSchema };
