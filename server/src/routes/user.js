const express = require("express");
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getUser);
router.post("/", createUser);
router.put("/", updateUser);
router.delete("/", deleteUser);

module.exports = router;
