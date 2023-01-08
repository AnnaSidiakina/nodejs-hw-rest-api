const express = require("express");
const { signup, login, logout } = require("../../controller/auth/index");
const { auth } = require("../../middlewares/auth");
const { ctrlWrapper } = require("../../helpers/ctrlWrapper");

const router = express.Router();

router.post("/signup", ctrlWrapper(signup));

router.post("/login", ctrlWrapper(login));

router.post("/logout", auth, ctrlWrapper(logout));

module.exports = router;
