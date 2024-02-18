const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs"); //file system

exports.getProductById = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id).populate("category").exec();

    if (!product) {
      return res.status(400).json({
        error: "Product not found",
      });
    }

    req.product = product;
    next();
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image",
        });
      }

      const { name, description, price, category, stock } = fields;

      if (!name || !description || !price || !category || !stock) {
        return res.status(400).json({
          error: "Please include all fields",
        });
      }

      let product = new Product(fields);

      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!",
          });
        }

        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
      }

      const newProduct = await product.save();
      res.json(newProduct);
    });
  } catch (err) {
    return res.status(400).json({
      error: "Saving product in DB failed",
    });
  }
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};
//middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};
//delete controllers
exports.deleteProduct = async (req, res) => {
  try {
    let product = req.product;
    const deletedProduct = await product.deleteOne();

    res.json({
      message: "Deletion was a success",
      deletedProduct,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Failed to delete the product",
    });
  }
};

//update controllers
exports.updateProduct = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image",
        });
      }

      // updation code
      let product = req.product;
      product = _.extend(product, fields);

      //handel file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!",
          });
        }

        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    });
  } catch (err) {
    return res.status(400).json({
      error: "Updation of product failed",
    });
  }
};

//product listing
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  const query = Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit);

  query
    .exec()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      return res.status(400).json({
        error: "No product Found",
      });
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "No category found",
      });
    }
    res.json(category);
  });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req?.body?.order?.products?.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {})
    .then((result) => {
      // result is an object containing information about the bulkWrite operation
      next();
    })
    .catch((err) => {
      return res.status(400).json({
        error: "Bulk operation failed",
      });
    });
};
