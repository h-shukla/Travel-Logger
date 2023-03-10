const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Users = require("../models/Users");
const { getToken, verifyToken } = require('../utils/tokenFunctions');

// register new user
const register = catchAsyncErrors(async (req, res, next) => {
    const usr = req.body;
    if (usr.password === usr.confirmPassword) {
        // encrypting password
        const signedPass = getToken(usr.password);

        // removing password field as we need to send it to client
        usr.password = signedPass;
        delete usr["confirmPassword"];
        const user = await Users.create(usr);

        // for setting tokens with cookies
        const token = getToken(JSON.stringify(user._id));

        res.status(200).cookie('token', token, {
            maxAge: 900000,
            httpOnly: true
        }).json({
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

// login existing users
const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    let user = await Users.findOne({ email });

    if (user) {
        // for setting tokens with cookies
        const token = getToken(JSON.stringify(user._id));
        const decodedPass = verifyToken(user.password);

        userDetails = {
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role
        };

        if (decodedPass === password) {
            res.status(200).cookie('token', token, {
                maxAge: 900000,
                httpOnly: true
            }).json({
                success: true,
                message: "user found",
                userDetails: userDetails
            });
        } else {
            res.status(400).json({
                success: true,
                message: "no user found or passwords do not match",
            });
        }
    } else {
        res.status(400).json({
            success: false,
            message: "no user found or passwords do not match",
            userDetails: "",
        });
    }
});

const logoutUser = (req, res, next) => {
    // clear the cookie that stores in logged in user information
    res.status(200).clearCookie("token").json({});
};

// get users --> Admin route
const getUsers = catchAsyncErrors(async (req, res, next) => {
    const id = req.cookies.token;
    if (id) {
        const vId = verifyToken(id);
        const user = await Users.findById(JSON.parse(vId));
        if (user.role === "admin") {
            const users = await Users.find();
            res.status(200).json({
                success: true,
                message: users,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "You are not authorized to access this url",
            });
        }
    } else {
        res.status(404).json({
            success: false,
            message: "Please log in first",
        });
    }
});

// update existing users
const updateUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, username, password } = req.body;
    const user = await Users.findOne({ email });
    if (verifyToken(user.password) === password) {
        const signedPass = getToken(password);
        console.log(signedPass);
        console.log(password);
        // use updateOne instead of udpate
        // update is depricated
        await user.updateOne({ name, email, username, signedPass });
        res.status(200).json({
            success: true,
            message: "User Updated",
        });
    } else {
        res.status(200).json({
            success: true,
            message: "Passwords do not match",
        });
    }
});

// delete existing user
const deleteUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (verifyToken(user.password) === password) {
        // use deleteOne() instead of delete()
        // delete() is depricated
        await user.deleteOne();
        res.status(200).json({
            success: true,
            message: "User deleted",
        });
    } else {
        res.status(200).json({
            success: true,
            message: "Passwords do not match",
        });
    }
});

module.exports = {
    getUsers,
    register,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
};

