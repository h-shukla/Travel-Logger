const jwt = require("jsonwebtoken");
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

module.exports = {
    getToken,
    verifyToken
};
