const express = require("express");
const {
    getUsers,
    register,
    updateUser,
    deleteUser,
    loginUser,
    adminDeleteUser,
} = require("../controllers/userController");

const router = express.Router();

// admin routes
// admin auth is in the controller as well
router.get("/users", getUsers);
router.delete("/admin/deleteuser/:id", adminDeleteUser);

// normal routes
router.post("/register", register);
router.post("/login", loginUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
