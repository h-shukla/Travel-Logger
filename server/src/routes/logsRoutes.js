const express = require("express");
const {
    getLogs,
    createLog,
    updateLog,
    deleteLog,
    getLogsForCurrentUser,
} = require("../controllers/logsController");

const router = express.Router();

router.get("/logs", getLogs);
router.get("/mylogs/:id", getLogsForCurrentUser);
router.post("/new/:userid", createLog);
router.put("/:id", updateLog);
router.delete("/:id", deleteLog);

module.exports = router;
