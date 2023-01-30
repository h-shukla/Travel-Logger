const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Logs = require("../models/Logs.js");
const { getToken, verifyToken } = require('../utils/tokenFunctions.js');
const { rmvDoubleQuotes } = require('../utils/quickutils');

const getLogs = catchAsyncErrors(async (req, res, next) => {
    const logs = await Logs.find();
    res.status(200).json({
        success: true,
        message: "get log reached",
        Logs: logs
    });
});

const getLogsForCurrentUser = catchAsyncErrors(async (req, res, next) => {
    const userId = verifyToken(req.cookies.token);
    const logs = await Logs.find({ user: rmvDoubleQuotes(userId) });
    res.status(200).json({
        success: true,
        message: "get log for user reached",
        userLogs: logs
    });
});

const createLog = catchAsyncErrors(async (req, res, next) => {
    const userId = verifyToken(req.cookies.token);
    const completeLog = { ...req.body, user: rmvDoubleQuotes(userId) };
    const log = await Logs.create(completeLog);
    res.status(200).json({
        success: true,
        message: "create log reached",
        log: log
    });
});

const updateLog = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "update log reached",
    });
});

const deleteLog = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "delete log reached",
    });
});

module.exports = {
    getLogs,
    createLog,
    updateLog,
    deleteLog,
    getLogsForCurrentUser
};
