const express = require("express");
const ctrlContacts = require("../../controller/index");

const router = express.Router();

router.get("/", ctrlContacts.get);

router.get("/:contactId", ctrlContacts.getById);

router.post("/", ctrlContacts.create);

router.delete("/:contactId", ctrlContacts.deleteContact);

router.put("/:contactId", ctrlContacts.updatebyId);

router.patch("/:contactId/favorite", ctrlContacts.updateStatusContact);

module.exports = router;
