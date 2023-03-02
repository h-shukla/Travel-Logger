const express = require("express");
const { getAllComm, getMyComm, createComm } = require("../controllers/communityController"); 

const router = express.Router();

router.get("/all", getAllComm);
router.get("/my", getMyComm);
router.post("/new", createComm);

module.exports = router;
