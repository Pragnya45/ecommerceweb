const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id)
    .exec()
    .then((category) => {
      if (!category) {
        return res.status(400).json({
          error: "Category not found in DB",
        });
      }
      req.category = category;
      next();
    })
    .catch((err) => {
      return res.status(500).json({
        error: "Internal Server Error",
      });
    });
};
exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const savedCategory = await category.save();

    res.json({ category: savedCategory });
  } catch (err) {
    return res.status(400).json({
      error: "Not able to save category in DB",
    });
  }
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find()
    .exec()
    .then((categories) => {
      if (!categories || categories.length === 0) {
        return res.status(400).json({
          error: "No categories found",
        });
      }
      res.json(categories);
    })
    .catch((err) => {
      return res.status(500).json({
        error: "Internal Server Error",
      });
    });
};

exports.updateCategory = async (req, res) => {
  try {
    const category = req.category;
    category.name = req.body.name;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    return res.status(400).json({
      error: "Failed to update category",
    });
  }
};

exports.removeCategory = async (req, res) => {
  try {
    const category = req.category;

    // Check if the category exists
    if (!category) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    // Remove the category from the database
    await category.deleteOne();

    res.json({
      message: "Category successfully deleted",
    });
  } catch (err) {
    return res.status(400).json({
      error: "Failed to remove this category",
    });
  }
};
