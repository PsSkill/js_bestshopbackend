const express = require("express");
const signup = require("../../controllers/auth/signup");

const router = express.Router();

router.post("/signup", signup.post_signup)

module.exports = router;