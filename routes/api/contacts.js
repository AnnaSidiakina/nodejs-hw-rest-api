const express = require("express");
const ctrlContacts = require("../../controller/contacts");
const { auth } = require("../../middlewares/auth");

const router = express.Router();

router.get("/", auth, ctrlContacts.get);

router.get("/:contactId", ctrlContacts.getById);

router.post("/", auth, ctrlContacts.create);

router.delete("/:contactId", ctrlContacts.deleteContact);

router.put("/:contactId", ctrlContacts.updatebyId);

router.patch("/:contactId/favorite", ctrlContacts.updateStatusContact);

module.exports = router;
