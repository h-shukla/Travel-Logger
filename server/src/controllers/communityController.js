const Community = require("../models/Community.js");
const Users = require("../models/Users");
const { verifyToken } = require("../utils/tokenFunctions");
const { rmvDoubleQuotes } = require("../utils/quickutils.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const getAllComm = catchAsyncErrors(async (req, res) => {
  try {
    const communities = await Community.find();
    if (communities) {
      res.status(200).json({
        success: true,
        message: communities,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "some internal error occurred",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: false,
      message: "some internal error occurred",
    });
  }
});

const getMyCreatedComm = catchAsyncErrors(async (req, res) => {
  try {
    const decodedToken = verifyToken(req.cookies.token);
    const communities = await Community.find({
      user: rmvDoubleQuotes(decodedToken),
    });
    res.status(200).json({
      success: true,
      message: communities,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: false,
      message: "some internal error occurred",
    });
  }
});

const createComm = catchAsyncErrors(async (req, res) => {
  try {
    const token = req.cookies.token;
    if (token !== null) {
      const userId = verifyToken(req.cookies.token);
      const completeCommunity = { ...req.body, user: rmvDoubleQuotes(userId) };
      const community = await Community.create(completeCommunity);
      res.status(200).json({
        success: true,
        message: "Community created",
        community: community,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: false,
      message: "some error occurred",
    });
  }
});

const updateComm = catchAsyncErrors(async (req, res) => {
  try {
    const decodedToken = verifyToken(req.cookies.token);
    const community = await Community.findById({
      _id: req.params.id,
    });
    if (JSON.stringify(community.user) === decodedToken) {
      await Community.findByIdAndUpdate(community._id, req.body);
      const updatedCommunity = await Community.findById(community._id);
      res.status(200).json({
        success: true,
        message: "Community updated",
        community: updatedCommunity,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "You do not have authorization for this request",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: false,
      message: "This community doesn't exist",
    });
  }
});

const deleteComm = catchAsyncErrors(async (req, res) => {
  try {
    const decodedToken = verifyToken(req.cookies.token);
    const community = await Community.findById({
      _id: req.params.id,
    });
    if (JSON.stringify(community.user) === decodedToken) {
      await Community.findByIdAndDelete(community._id);
      res.status(200).json({
        success: true,
        message: "Community deleted",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "You do not have authorization for this request",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: false,
      message: "This community doesn't exist",
    });
  }
});

const joinComm = catchAsyncErrors(async (req, res, next) => {
  const decodedToken = verifyToken(req.cookies.token);
  const community = await Community.findById({
    _id: req.body.commid,
  });
  await Users.findByIdAndUpdate(rmvDoubleQuotes(decodedToken), {
    $push: { communities: community },
  });
  await Community.findByIdAndUpdate(req.body.commid, { $inc: { members: 1 } });
  if (!decodedToken || !community) {
    next();
  } else {
    res.status(200).json({
      success: true,
      message: "community joined successfully",
    });
  }
});

const leaveComm = catchAsyncErrors(async (req, res) => {
  // get user with cookies
  // remove the community from communities array of user's model
  // update the members in community number
  const decodedToken = verifyToken(req.cookies.token);
  const community = await Community.findById({
    _id: req.body.commid,
  });
  await Users.findByIdAndUpdate(rmvDoubleQuotes(decodedToken), {
    $pull: { communities: community._id },
  });
  await Community.findByIdAndUpdate(req.body.commid, { $inc: { members: -1 } });
  if (!decodedToken || !community) {
    next();
  } else {
    res.status(200).json({
      success: true,
      message: "community left successfully",
    });
  }
});

const addCommentInCommunity = catchAsyncErrors(async (req, res) => {});

const updateCommentInCommunity = catchAsyncErrors(async (req, res) => {});

const deleteCommentInCommunity = catchAsyncErrors(async (req, res) => {});

module.exports = {
  getAllComm,
  getMyCreatedComm,
  createComm,
  updateComm,
  deleteComm,
  joinComm,
  leaveComm,
  addCommentInCommunity,
  updateCommentInCommunity,
  deleteCommentInCommunity,
};
