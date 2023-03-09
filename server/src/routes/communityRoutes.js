const express = require("express");
const { getAllComm, getMyComm, createComm, updateComm, deleteComm } = require("../controllers/communityController"); 

const router = express.Router();

router.get("/all", getAllComm);
router.post("/new", createComm);
router.get("/my", getMyComm);
router.put('/:id', updateComm).delete('/:id', deleteComm);


module.exports = router;
