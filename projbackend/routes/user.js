const express = require("express");
const router = express.Router();

const {getUserById , getUser, updateUser} = require("../controllers/user");

const{isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");

router.param("id", getUserById);

router.get("/user/:id", isSignedIn, isAuthenticated, getUser);
//router.get("/users",getAllUsers);//creating a router .get all users assignment
router.put("/user/:userId",updateUser);
module.exports = router;
