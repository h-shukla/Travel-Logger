const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const getUser = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "get route",
  });
});

const createUser = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "create route",
  });
});

const updateUser = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "update route",
  });
});

const deleteUser = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "delete route",
  });
});

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
