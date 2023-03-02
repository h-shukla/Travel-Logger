const Community = require("../models/Community.js");

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
}

const getMyComm = async (req, res) => {
    res.status(400).json({
        success: true,
        message: "reached get my comm"
    });
}

const createComm = async (req, res) => {
    const {
        name,
        description,
        user,
        backgroundImgUrl,
        comments,
        members
    } = req.body;

    console.log(
        name,
        description,
        user,
        backgroundImgUrl,
        comments,
        members
    )
    res.status(400).json({
        success: true,
        message: "reached get my comm"
    });
}

module.exports = {
    getAllComm,
    getMyComm,
    createComm
};
