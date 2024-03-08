const express = require("express");

const stock = require("../../controllers/stock/stock");
const authenticate_token = require("../../middleware/authenticate_token");

const router = express.Router();

router.get("/stock", stock.get_stocks)
router.post("/stock", authenticate_token, stock.post_stocks)


module.exports = router;
