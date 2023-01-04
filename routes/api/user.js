const express = require("express");
const ctrlAuth = require("../../controller/user");
const { auth } = require("../../middlewares/auth");

const router = express.Router();

router.get("/current", auth, ctrlAuth.getCurrentUser);

module.exports = router;
