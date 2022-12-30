const express = require("express");
const { contactSchema } = require("../../validation");
const { BadRequest, NotFound } = require("http-errors");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.status(200).json({ data });
  } catch (err) {
    throw new NotFound("Not found");
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const data = await getContactById(contactId);
    if (data === undefined) {
      throw new NotFound("Not found");
    }
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw BadRequest("missing required name field");
    }
    const data = await addContact(req.body);
    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const data = await getContactById(contactId);
    if (!data) {
      throw new NotFound("Not found");
    }
    await removeContact(contactId);

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw BadRequest("missing required name field");
    }

    const contactId = req.params.contactId;

    const updatedContact = await updateContact(contactId, req.body);
    if (!updatedContact) {
      throw new NotFound("Not found");
    }
    res.status(200).json({ updatedContact });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
