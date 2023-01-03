const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../service/index");
const { BadRequest, NotFound } = require("http-errors");
const {
  validationSchema,
  updateFavoriteSchema,
} = require("../service/schemas/contact");
const { createError } = require("../helpers/error");

const get = async (req, res, next) => {
  try {
    const data = await listContacts();
    res.status(200).json(data);
  } catch (err) {
    throw new NotFound("Not found");
  }
};

const create = async (req, res, next) => {
  const body = req.body;
  try {
    const { error } = validationSchema.validate(body);
    if (error) {
      throw BadRequest("missing required name field");
    }

    const data = await addContact(body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const data = await getContactById(contactId);
    if (!data) {
      throw createError(404, "Not found");
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const data = await removeContact(contactId);
    if (!data) {
      throw createError(404, "Not found");
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updatebyId = async (req, res, next) => {
  try {
    const { error } = validationSchema.validate(req.body);
    if (error) {
      throw BadRequest("missing required name field");
    }
    const contactId = req.params.contactId;
    const data = await updateContact(contactId, req.body);
    if (!data) {
      throw createError(404, "Not found");
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
      throw BadRequest("missing field favorite");
    }
    const contactId = req.params.contactId;
    const data = await updateContact(contactId, req.body);
    if (!data) {
      throw createError(404, "Not found");
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
  create,
  getById,
  deleteContact,
  updatebyId,
  updateStatusContact,
};
