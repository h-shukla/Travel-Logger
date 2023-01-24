const express = require("express");
const {
  getUsers,
  register,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

const router = express.Router();

// admin routes
router.get("/users", getUsers);

// normal routes
router.post("/login", loginUser);
router.post("/register", register);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
