const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const getLog = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "",
    });
});

const createLog = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "",
    });
});

const updateLog = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "",
    });
});

const deleteLog = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "",
    });
});

module.exports = {
    getLog,
    createLog,
    updateLog,
    deleteLog,
};
