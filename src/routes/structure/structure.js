const express = require("express");

const category = require("../../controllers/structure/category");
const item_name = require("../../controllers/structure/item_name");
const sub_category = require("../../controllers/structure/sub_category");
const brand = require("../../controllers/structure/brand");
const model = require("../../controllers/structure/model");
const color = require("../../controllers/structure/color");
const size = require("../../controllers/structure/size");
const image_uploader_middleware = require("../../middleware/image_uploader");

const router  = express.Router()

router.get("/category", category.get_category)
router.post("/category", image_uploader_middleware, category.post_category)

router.get("/item-name", item_name.get_item_name)



router.get("/sub-category", sub_category.get_sub_category)



router.get("/brand", brand.get_brand)

router.get("/model", model.get_model)

router.get("/color", color.get_color)

router.get("/size", size.get_size)                                                                                                                           

module.exports = router;

