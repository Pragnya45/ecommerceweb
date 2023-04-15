const express = require("express");
const router = express.Router();

const { getUserById, getUser, updateUser } = require("../controllers/user");

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
//router.get("/users",getAllUsers);//creating a router .get all users assignment
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
module.exports = router;
