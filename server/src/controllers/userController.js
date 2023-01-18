const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Users = require("../models/Users");

const createUser = catchAsyncErrors(async (req, res, next) => {
    const { name, username, email, password, confirmPassword } = req.body;
    if (password === confirmPassword) {
        const user = await Users.create({
            name,
            username,
            email,
            password,
            confirmPassword,
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
    createUser,
    updateUser,
    deleteUser,
    loginUser,
};
