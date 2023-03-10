const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Logs = require("../models/Logs.js");
const { getToken, verifyToken } = require('../utils/tokenFunctions.js');
const { rmvDoubleQuotes } = require('../utils/quickutils');

const getLogs = catchAsyncErrors(async (req, res, next) => {
    const logs = await Logs.find();
    if (logs != null) {
        res.status(200).json({
            success: true,
            message: "get log reached",
            Logs: logs
        });
    } else {
        res.status(400).json({
            success: false,
            message: "no logs found"
        });
    }
});

const getLogsForCurrentUser = catchAsyncErrors(async (req, res, next) => {
    const userId = verifyToken(req.cookies.token);
    if (userId != null) {
        const logs = await Logs.find({ user: rmvDoubleQuotes(userId) });
        res.status(200).json({
            success: true,
            message: "get log for user reached",
            userLogs: logs
        });
    } else {
        res.status(400).json({
            success: false,
            message: "User not logged in",
        });
    }
});

const createLog = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.token;
    if (token != null) {
        const userId = verifyToken(req.cookies.token);
        const completeLog = { ...req.body, user: rmvDoubleQuotes(userId) };
        const log = await Logs.create(completeLog);
        res.status(200).json({
            success: true,
            message: "Log created",
            log: log
        });
    } else {
        res.status(400).json({
            success: false,
            message: "User not logged in",
        });
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
            log: newLog
        });
    } else {
        res.status(400).json({
            success: false,
            message: "No data provided in the body"
        });
    }
});

const deleteLog = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const userId = verifyToken(req.cookies.token);
    const currentLog = await Logs.findOneAndDelete({ _id: id, user: rmvDoubleQuotes(userId) });
    if (currentLog) {
        res.status(200).json({
            success: true,
            message: "log deleted successfully",
        });
    } else {
        res.status(400).json({
            success: false,
            message: "Some internal error occured"
        });
    }
});

module.exports = {
    getLogs,
    createLog,
    updateLog,
    deleteLog,
    getLogsForCurrentUser
};
