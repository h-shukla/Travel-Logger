const express = require("express");
const {
    getAllComm,
    getMyCreatedComm,
    createComm,
    updateComm,
    deleteComm,
    addCommentInCommunity,
    deleteCommentInCommunity,
    joinComm,
    leaveComm,
    adminDeleteCommunity,
    getOneCommunity,
} = require("../controllers/communityController");

const router = express.Router();

// Admin routes
router.delete("/admin/delete/:token/:id", adminDeleteCommunity);

// community routes
router.get("/all", getAllComm);
router.get("/:id", getOneCommunity);
router.post("/new", createComm);
router.get("/my", getMyCreatedComm);
router.put("/:id", updateComm).delete("/:id", deleteComm);
router.post("/join", joinComm).post("/leave", leaveComm);

// comments routes
router.post("/comments/new/:userid", addCommentInCommunity);
router.delete("/comments/delete/:commid/:commentid", deleteCommentInCommunity);

module.exports = router;
