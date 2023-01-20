const jwt = require('jsonwebtoken');
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Users = require("../models/Users");

const getToken = (password) => {
    const key = process.env.PRIVATE_KEY_JWT;
    const token = jwt.sign(password, key);
    return token;
};

const register = catchAsyncErrors(async (req, res, next) => {
    // TODO: add jwt encryption and send tokens to authenticate admin routes
    const userFromReq = req.body;
    if (userFromReq.password === userFromReq.confirmPassword) {
        const signedPass = getToken(userFromReq.password);

        const originalString = jwt.verify(signedPass, process.env.PRIVATE_KEY_JWT);
        console.log(originalString);

        const user = await Users.create({
            name: userFromReq.name,
            username: userFromReq.username,
            email: userFromReq.email,
            password: signedPass,
            role: userFromReq.role
        });

        res.status(200).json({
            success: true,
            message: "User Created",
            userDetails: {
                name: user.name,
                email: user.email,
                username: user.username,
            },
        });
    } else {
        res.status(400).json({
            success: false,
            message: "passwords do not match",
            userDetails: "",
        });
    }
});

const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
        if (user.password === password) {
            res.status(200).json({
                success: true,
                message: "user found",
                userDetails: user,
            });
        } else {
            res.status(400).json({
                success: true,
                message: "no user found or passwords do not match",
                userDetails: "",
            });
        }
    } else {
        res.status(400).json({
            success: false,
            message: "no user found",
            userDetails: "",
        });
    }
});

const getUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await Users.find();
    res.status(200).json({
        success: true,
        users: users,
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
    getUsers,
    register,
    updateUser,
    deleteUser,
    loginUser,
};
