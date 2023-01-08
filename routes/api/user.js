const express = require("express");
const { auth } = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

const { ctrlWrapper } = require("../../helpers/ctrlWrapper");
const {
  getCurrentUser,
  updateSubscriptionStatus,
  updateAvatar,
} = require("../../controller/user/index");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(getCurrentUser));
router.patch("/", auth, ctrlWrapper(updateSubscriptionStatus));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);

module.exports = router;
