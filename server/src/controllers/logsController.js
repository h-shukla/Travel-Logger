const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Logs = require("../models/Logs.js");
const { verifyToken } = require("../utils/tokenFunctions.js");
const { rmvDoubleQuotes } = require("../utils/quickutils");

const getLogs = catchAsyncErrors(async (req, res, next) => {
    const logs = await Logs.find();
    if (logs != null) {
        res.status(200).json({
            success: true,
            message: "get log reached",
            Logs: logs,
        });
    } else {
        res.status(400).json({
            success: false,
            message: "no logs found",
        });
    }
});

const getLogsForCurrentUser = catchAsyncErrors(async (req, res, next) => {
    const userId = req.params.id;
    if (userId) {
        const logs = await Logs.find({ user: userId });
        res.status(200).json({
            success: true,
            message: "get log for user reached",
            userLogs: logs,
        });
    } else {
        next();
    }
});

const createLog = catchAsyncErrors(async (req, res, next) => {
    const userId = req.params.userid;
    if (userId) {
        const completeLog = { ...req.body, user: userId };
        const log = await Logs.create(completeLog);
        res.status(200).json({
            success: true,
            message: "Log created",
            log: log,
        });
    } else {
        next();
    }
});

const updateLog = catchAsyncErrors(async (req, res, next) => {
    // checking if the req body is empty
    if (req.body !== undefined) {
        await Logs.findByIdAndUpdate(req.params.id, req.body);
        const newLog = await Logs.findById(req.params.id);
        res.status(200).json({
            success: true,
            message: "log updated",
            log: newLog,
        });
    } else {
        res.status(400).json({
            success: false,
            message: "No data provided in the body",
        });
    }
});

const deleteLog = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const currentLog = await Logs.findOneAndDelete({
        _id: id,
    });
    if (currentLog) {
        res.status(200).json({
            success: true,
            message: "log deleted successfully",
        });
    } else {
        res.status(400).json({
            success: false,
            message: "Some internal error occured",
        });
    }
});

module.exports = {
    getLogs,
    createLog,
    updateLog,
    deleteLog,
    getLogsForCurrentUser,
};
