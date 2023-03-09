const Community = require("../models/Community.js");
const { getToken, verifyToken } = require('../utils/tokenFunctions');
const { rmvDoubleQuotes } = require('../utils/quickutils.js');

const getAllComm = async (req, res) => {
    try {
        const communities = await Community.find();
        if (communities) {
            res.status(200).json({
                success: true,
                message: communities
            });
        } else {
            res.status(200).json({
                success: true,
                message: "some internal error occurred"
            });
        }
    } catch(e) {
        console.log(e);
        res.status(400).json({
            success: false,
            message: "some internal error occurred"
        });
    }
};

const getMyComm = async (req, res) => {
    try {
        const decodedToken = verifyToken(req.cookies.token);
        const communities = await Community.find({
            user: rmvDoubleQuotes(decodedToken)
        });
        res.status(200).json({
            success: true,
            message: communities
        });
    }catch(e) {
        console.log(e);
        res.status(400).json({
            success: false,
            message: "some internal error occurred"
        });
    }
};

const createComm = async (req, res) => {
    try{
        const data = req.body;
        const community = await Community.create(data);
        console.log(community);
        res.status(400).json({
            success: true,
            message: "reached get my comm"
        });
    } catch(e) {
        console.log(e);
        res.status(400).json({
            success: false,
            message: "some error occurred"
        });
    }
};

const updateComm = async (req, res) => {
    // can push to comments array with `community.comments.push('comment')`
    try {
        const decodedToken = verifyToken(req.cookies.token);
        const community = await Community.findById({
            _id: req.params.id
        });
        if (JSON.stringify(community.user) === decodedToken) {
            await Community.findByIdAndUpdate(community._id, req.body);
            const updatedCommunity = await Community.findById(community._id);
                  res.status(200).json({
                success: true,
                message: "Community found",
                community: updatedCommunity
            });
        } else {
            res.status(400).json({
                success: false,
                message: "You do not have authorization for this request",
            });
        }
    } catch(e) {
        console.log(e);
        res.status(400).json({
            success: false,
            message: "This community doesn't exist"
        });
    }
};

const deleteComm = async (req, res) => {
    
};

const joinComm = async(req, res) => {
    
};

const leaveComm = async(req, res) => {
    
};

const addCommentInCommunity = async(req, res) => {
    
};

const updateCommentInCommunity = async(req, res) => {
    
};

const deleteCommentInCommunity = async(req, res) => {
    
};

module.exports = {
    getAllComm,
    getMyComm,
    createComm,
    updateComm,
    deleteComm,
    joinComm,
    leaveComm,
    addCommentInCommunity,
    updateCommentInCommunity,
    deleteCommentInCommunity
};
