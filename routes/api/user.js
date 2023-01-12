const express = require("express");
const { auth } = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

const { ctrlWrapper } = require("../../helpers/ctrlWrapper");
const {
  getCurrentUser,
  updateSubscriptionStatus,
  updateAvatar,
  verifyEmail,
  resendEmail,
} = require("../../controller/user/index");
const { verify } = require("crypto");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(getCurrentUser));
router.patch("/", auth, ctrlWrapper(updateSubscriptionStatus));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);
router.get("/verify/:verificationToken", ctrlWrapper(verifyEmail));
router.post("/verify", ctrlWrapper(resendEmail));

module.exports = router;
