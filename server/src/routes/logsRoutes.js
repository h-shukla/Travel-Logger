const express = require("express");
const {
  getLog,
  createLog,
  updateLog,
  deleteLog,
} = require("../controllers/logsController");

const router = express.Router();

router.get("/", getLog);
router.post("/", createLog);
router.put("/", updateLog);
router.delete("/", deleteLog);

module.exports = router;
