const express = require("express");
const signup = require("../../controllers/auth/signup");
const authenticate_token = require("../../middleware/authenticate_token");

const router = express.Router();
router.use(authenticate_token)
router.post("/signup", signup.post_signup)

module.exports = router;