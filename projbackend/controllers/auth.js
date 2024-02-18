const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg,
      });
    }

    const user = new User(req.body);
    await user.save(); // Save the user to the database

    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error: "Not able to save user in DB",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const errors = validationResult(req);
    const { email, password } = req.body; // Destructuring code

    if (!errors.isEmpty()) {
      // Validation error
      return res.status(422).json({
        error: errors.array()[0].msg,
      });
    }

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(400).json({
        error: "User email does not exist",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    // Create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    // Put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });
    // new Date(Date.now() + 9999);

    // Send response to frontend
    const { _id, name, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signout",
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

//custom middlewares

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    //role of profile is 0 then he is not admin if 1 then admin.
    return res.status(403).json({
      error: "You are not ADMIN,Access denied",
    });
  }

  next();
};
