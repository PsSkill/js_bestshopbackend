const express = require("express");

const stock = require("../../controllers/stock/stock");

const router = express.Router();

router.get("/stock", stock.get_stocks)


module.exports = router;
