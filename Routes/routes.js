const express = require('express')
const router = express.Router();

const { login, signup, ContactUs } = require("../Controllers/Auth");

router.post("/signup", signup);
router.post("/login", login);
router.post("/ContactUs", ContactUs);


module.exports = router;