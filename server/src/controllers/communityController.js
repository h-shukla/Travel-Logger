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
            res.status(400).json({
                success: false,
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
        const community = await Community.create(req.body);
        res.status(200).json({
            success: true,
            message: "Community created",
            community: community,
        });
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
        const community = await Community.findById(req.params.id);
        await Community.findByIdAndDelete(community._id);
        res.status(200).json({
            success: true,
            message: "Community deleted",
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            message: "This community doesn't exist",
        });
    }
});

const joinComm = catchAsyncErrors(async (req, res, next) => {
    const decodedToken = verifyToken(req.body.token);
    const community = await Community.findById({
        _id: req.body.commid,
    });
    await Users.findByIdAndUpdate(rmvDoubleQuotes(decodedToken), {
        $push: { communities: community },
    });
    await Community.findByIdAndUpdate(req.body.commid, {
        $inc: { members: 1 },
    });
    if (!decodedToken || !community) {
        next();
    } else {
        res.status(200).json({
            success: true,
            message: "community joined successfully",
        });
    }
});

const leaveComm = catchAsyncErrors(async (req, res, next) => {
    const decodedToken = verifyToken(req.cookies.token);
    const community = await Community.findById({
        _id: req.body.commid,
    });
    await Users.findByIdAndUpdate(rmvDoubleQuotes(decodedToken), {
        $pull: { communities: community._id },
    });
    await Community.findByIdAndUpdate(req.body.commid, {
        $inc: { members: -1 },
    });
    if (!decodedToken || !community) {
        next();
    } else {
        res.status(200).json({
            success: true,
            message: "community left successfully",
        });
    }
});

const addCommentInCommunity = catchAsyncErrors(async (req, res, next) => {
    const userId = req.params.userid;
    const community = await Community.findById({
        _id: req.body.commid,
    });
    if (!userId || !community) {
        next();
    } else {
        const user = await Users.findById(userId);
        await Community.findByIdAndUpdate(req.body.commid, {
            $push: {
                comments: {
                    comment: req.body.comment,
                    username: user.username,
                },
            },
        });

        res.status(200).json({
            success: true,
            message: "comment added",
        });
    }
});

const deleteCommentInCommunity = catchAsyncErrors(async (req, res, next) => {
    const community = await Community.findById(req.params.commid);
    if (!community) {
        next();
    } else {
        await Community.findByIdAndUpdate(req.params.commid, {
            $pull: { comments: { _id: req.params.commentid } },
        });
        res.status(200).json({
            success: true,
            message: "comment deleted",
        });
    }
});

const getOneCommunity = async (req, res, next) => {
    const id = req.params.id;
    const community = await Community.findById(id);
    if (community) {
        res.status(200).json({
            success: true,
            community: community,
        });
    } else {
        next();
    }
};

// ADMIN route
const adminDeleteCommunity = catchAsyncErrors(async (req, res, next) => {
    const decodedToken = verifyToken(req.params.token);
    const communityId = req.params.id;
    if (!decodedToken || !communityId) {
        next();
    }
    await Community.findByIdAndDelete(communityId);
    res.status(200).json({
        success: true,
        message: "community deleted",
    });
});

module.exports = {
    getAllComm,
    getMyCreatedComm,
    createComm,
    updateComm,
    deleteComm,
    joinComm,
    leaveComm,
    addCommentInCommunity,
    deleteCommentInCommunity,
    adminDeleteCommunity,
    getOneCommunity,
};
