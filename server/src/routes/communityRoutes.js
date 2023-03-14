const express = require("express");
const {
  getAllComm,
  getMyCreatedComm,
  createComm,
  updateComm,
  deleteComm,
  addCommentInCommunity,
  deleteCommentInCommunity,
  updateCommentInCommunity,
  joinComm,
  leaveComm,
} = require("../controllers/communityController");

const router = express.Router();

// community routes
router.get("/all", getAllComm);
router.post("/new", createComm);
router.get("/my", getMyCreatedComm);
router.put("/:id", updateComm).delete("/:id", deleteComm);
router.post("/join", joinComm).post("/leave", leaveComm);

// Community comments routes
router.post("/comments/new", addCommentInCommunity);
router
  .put("/comments/update", updateCommentInCommunity)
  .delete("/comments/delete", deleteCommentInCommunity);

module.exports = router;
