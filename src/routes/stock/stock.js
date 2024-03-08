const express = require("express");

const stock = require("../../controllers/stock/stock");
const csv = require("../../controllers/stock/export");

const router = express.Router();

router.get("/stock", stock.get_stocks)
router.post("/stock", stock.post_stocks)

router.get("/export-csv", csv.get_csv)


module.exports = router;
