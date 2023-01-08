const express = require("express");
const { auth } = require("../../middlewares/auth");
const { ctrlWrapper } = require("../../helpers/ctrlWrapper");
const {
  getAll,
  getById,
  deleteContact,
  updatebyId,
  create,
  updateStatusContact,
} = require("../../controller/contacts/index");
const { validateId } = require("../../middlewares/validateId");

const router = express.Router();

router.get("/", auth, ctrlWrapper(getAll));

router.get("/:contactId", validateId, ctrlWrapper(getById));

router.post("/", auth, ctrlWrapper(create));

router.delete("/:contactId", validateId, ctrlWrapper(deleteContact));

router.put("/:contactId", validateId, ctrlWrapper(updatebyId));

router.patch(
  "/:contactId/favorite",
  validateId,
  ctrlWrapper(updateStatusContact)
);

module.exports = router;
