const User = require("../models/user"); //
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  const query = User.findById(id);
  query
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "No user was found in DB",
        });
      }
      req.profile = user;
      next();
    })
    .catch((err) => {
      return res.status(500).json({
        error: "Internal server error",
      });
    });
};

exports.getUser = (req, res) => {
  //todo get back here for password
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

// exports.getAllUsers = (req, res) => {
//   User.find()
//     .exec()
//     .then((users) => {
//       if (!users || users.length === 0) {
//         return res.status(400).json({
//           err: "No Users found",
//         });
//       }
//       res.json(users);
//     })
//     .catch((err) => {
//       return res.status(500).json({
//         err: "Internal Server Error",
//       });
//     });
// };

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.profile._id, req.body, {
    new: true,
    useFindAndModify: false,
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "You are not authorized to update this user",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: "Internal server error",
      });
    });
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No Order in this account",
        });
      }
      return res.json(order);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req?.body?.order?.products?.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });
  //store thi in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }
      next();
    })
    .catch((err) => {
      return res.status(500).json({
        error: "Internal server error",
      });
    });
};
