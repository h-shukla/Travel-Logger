const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Users = require("../models/Users");
const key = process.env.PRIVATE_KEY_JWT;

// generate token for passwords
const getToken = (value) => {
    const token = jwt.sign(value, key);
    return token;
};

// Verify the given token
const verifyToken = (value) => {
    const decodedString = jwt.verify(value, key);
    return decodedString;
};

// register new user
const register = catchAsyncErrors(async (req, res, next) => {
    const userFromReq = req.body;
    if (userFromReq.password === userFromReq.confirmPassword) {
        // getting a token for passsword
        const signedPass = getToken(userFromReq.password);

        // changing values for sending to client
        userFromReq.password = signedPass;
        delete userFromReq["confirmPassword"];
        const user = await Users.create(userFromReq);

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
    const user = await Users.findOne({ email });
    const decodedPass = verifyToken(user.password);

    // for setting tokens with cookies
    const token = getToken(JSON.stringify(user._id));
    if (user) {
        if (decodedPass === password) {
            res.status(200).cookie('token', token, {
                maxAge: 900000,
                httpOnly: true 
            }).json({
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
            message: "no user found or passwords do not match",
            userDetails: "",
        });
    }
});

// logout logged in users
const logoutUser = (req, res, next) => {
    res.status(200).clearCookie("token").json({});
};

// get users --> Admin routes
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

