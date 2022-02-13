const middlewareWrapper = require("cors");
const { Router } = require("express");
const express = require("express");

const {
  getProducts,
  productCreate,
  productDelete,
  productUpdate,
  getSingleProduct,
} = require("./controllers");
const upload = require("./middleware/multer");

//middleware
const router = express.Router();

router.param("productId", async (req, res, next, productId) => {
  const product = await getSingleProduct(productId, next);
  req.product = product;
  next();
});

router.get("/", getProducts);
router.get("/:productId", upload.single("image"), getSingleProduct);
router.post("/", productCreate);
router.delete("/:productId", productDelete);
router.put("/:productId", upload.single("image"), productUpdate);

module.exports = router;
