const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apifeatures");
const ExpressError = require("../utils/errorHandler");
const wrapAsync = require("../utils/wrapAsync");

//create product --Admin
exports.createProduct = wrapAsync(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//get all products
exports.getAllProducts = wrapAsync(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  const apifeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apifeature.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

// get product details
exports.getProductDetails = wrapAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ExpressError(404, "Product not found"));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//update product --Admin
exports.updateProduct = wrapAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ExpressError(404, "Product not found"));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//delete product
exports.deleteProduct = wrapAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new ExpressError(404, "Product not found"));
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
