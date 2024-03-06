const express = require("express");

const structure = require("../../controllers/structure/category");

const router  = express.Router()

router.get("/category", structure.get_category)

module.exports = router;

