const express = require("express");
const ctrlAuth = require("../../controller/auth");

const router = express.Router();

router.post("/signup", ctrlAuth.signup);

router.post("/login", ctrlAuth.login);

module.exports = router;
