// This file should deal with all JWT related functions

const jwt = require('jsonwebtoken');

// This function will be used to generate a JWT token
async function generateToken(user) {
    // The token will be signed with the user's email and password
    // The token will expire in 24 hours
    return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

// This function will be used to verify a JWT token
async function verifyToken(token) {
    // The token will be verified using the secret key if the token is malformed, expired or invalid, an error will be thrown
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    generateToken,
    verifyToken
}