const express = require("express");
const {
    getUsers,
    register,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
    u
} = require("../controllers/userController");

const router = express.Router();

// admin routes
router.get("/users", getUsers);

// normal routes
router.post("/register", register);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/u", u);

module.exports = router;
