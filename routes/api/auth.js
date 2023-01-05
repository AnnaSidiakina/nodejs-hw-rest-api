const express = require("express");
const ctrlAuth = require("../../controller/auth");
const { auth } = require("../../middlewares/auth");

const router = express.Router();

router.post("/signup", ctrlAuth.signup);

router.post("/login", ctrlAuth.login);

router.post("/logout", auth, ctrlAuth.logout);

module.exports = router;
