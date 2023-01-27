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

const logoutUser = (req, res, next) => {
    res.status(200).clearCookie("token").json({});
}


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

const updateUser = catchAsyncErrors(async (req, res, next) => {
    const user = req.body;
    console.log(user);
    res.status(200).json({
        success: true,
        message: "update route reached",
    });
});

const deleteUser = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "delete route reached",
    });
});

const u = async (req, res, next) => {
    const id = req.cookies.token;
    console.log(id);
    const vId = verifyToken(id);
    const user = await Users.findById(JSON.parse(vId));
    res.send(user);
}

module.exports = {
    getUsers,
    register,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
    u
};
