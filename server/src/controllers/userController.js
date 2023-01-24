const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Users = require("../models/Users");
const key = process.env.PRIVATE_KEY_JWT;

// generate token for passwords
const getToken = (password) => {
    const token = jwt.sign(password, key);
    return token;
};

// Verify the given token
const verifyToken = (token) => {
    const decodedString = jwt.verify(token, key);
    return decodedString;
};

const register = catchAsyncErrors(async (req, res, next) => {
    const userFromReq = req.body;
    if (userFromReq.password === userFromReq.confirmPassword) {
        // getting a token for passsword
        const signedPass = getToken(userFromReq.password);

        // changing some values so it can be passed on to the create function
        userFromReq.password = signedPass;
        delete userFromReq["confirmPassword"];
        const user = await Users.create(userFromReq);

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
    // TODO: send tokens to authenticate admin routes
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    const decodedPass = verifyToken(user.password);
    if (user) {
        if (decodedPass === password) {
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
