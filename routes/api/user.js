const express = require("express");
const { auth } = require("../../middlewares/auth");
const { ctrlWrapper } = require("../../helpers/ctrlWrapper");
const {
  getCurrentUser,
  updateSubscriptionStatus,
} = require("../../controller/user/index");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(getCurrentUser));
router.patch("/", auth, ctrlWrapper(updateSubscriptionStatus));

module.exports = router;
