const Product = require("../../models/Product");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.getSingleProduct = async (productId, next) => {
  try {
    const product = await Product.findById(productId);
    if (product) return product;
    else {
      const err = new Error("product Not found");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.productCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}${req.file.path}`;
    }
    const newProduct = await Product.create(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    // return res.status(500).json({ message: error.message });
    next(error);
  }
};
exports.productDelete = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const foundProduct = await Product.findById(productId);
    if (foundProduct) {
      foundProduct.remove();
      return res.status(204).end();
    } else {
      // return res.status(404).json({ message: "Product not found" });
      const err = new Error("Product Not Found");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.productUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}${req.file.path}`;
      const productId = req.productId;
      const Product = await Product.findByIdAndUpdate(productId, req.body, {
        new: true,
        runValidators: true,
      });
      return res.json(foundProduct);
    }
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------------------------#######-------------------------//

// const Product = require("../../models/Product");

// exports.getProducts = async (req, res, next) => {
//   try {
//     const products = await Product.find();
//     return res.json(products);
//   } catch (error) {
//     // return res.status(500).json({ message: error.message });
//     next(error);
//   }
// };

// exports.productCreate = async (req, res, next) => {
//   try {
//     const newProduct = await Product.create(req.body);
//     return res.status(201).json(newProduct);
//   } catch (error) {
//     // return res.status(500).json({ message: error.message });
//     next(error);
//   }
// };
// exports.productDelete = async (req, res, next) => {
//   try {
//     const { productId } = req.params;
//     const foundProduct = await Product.findById(productId);
//     if (foundProduct) {
//       foundProduct.remove();
//       return res.status(204).end();
//     } else {
//       // return res.status(404).json({ message: "Product not found" });
//       const err = new Error("Product Not Found");
//       err.status = 404;
//       next(err);
//     }
//   } catch (error) {
//     // return res.status(500).json({ message: error.message });
//     next(error);
//   }
// };

// exports.productUpdate = async (req, res, next) => {
//   try {
//     const { productId } = req.params;
//     let foundProduct = await Product.findById(productId);
//     if (foundProduct) {
//       foundProduct = await Product.findByIdAndUpdate(productId, req.body, {
//         new: true,
//       });
//       return res.json(foundProduct);
//     } else {
//       return res.status(404).json({ message: "Product not found" });
//     }
//   } catch (error) {
//     // return res.status(500).json({ message: error.message });
//     next(error);
//   }
// };
