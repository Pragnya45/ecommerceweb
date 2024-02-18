const { Order, ProductCart } = require("../models/order");

exports.getOrderById = async (req, res, next, id) => {
  try {
    const order = await Order.findById(id)
      .populate("products.product", "name price")
      .exec();

    if (!order) {
      return res.status(400).json({
        error: "No order found in DB",
      });
    }

    req.order = order;
    next();
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    const newOrder = await order.save();

    res.json(newOrder);
  } catch (err) {
    return res.status(400).json({
      error: "Failed to save your order in DB",
    });
  }
};

exports.getAllOrders = (req, res) => {
  const query = Order.find().populate("user", "_id name");

  query
    .exec()
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      return res.status(400).json({
        error: "No orders found in DB",
      });
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.Schema.path("status").enumValues);
};
// exports.updateStatus = (req, res) => {
//   Order.updateOne(
//     { _id: req.body.orderId },
//     { $set: { status: req.body.status } },
//     (err, order) => {
//       if (err) {
//         return res.status(400).json({
//           error: "Cannot update order status",
//         });
//       }
//       res.json(order);
//     }
//   );
// };

exports.updateStatus = async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: req.body.orderId },
      { $set: { status: req.body.status } },
      { new: true } // To return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    res.json(updatedOrder);
  } catch (err) {
    return res.status(400).json({
      error: "Cannot update order status",
    });
  }
};
