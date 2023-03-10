const express = require("express");
const {
    getUsers,
    register,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
} = require("../controllers/userController");

const router = express.Router();

// admin routes
// admin auth is in the controller as well
router.get("/users", getUsers);

// normal routes
router.post("/register", register);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
