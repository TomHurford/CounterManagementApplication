// Controller for users

const prisma = require('../../prisma/prisma.js');
const jwt = require('../utils/jwt.js');
const bcrypt = require('../utils/bcrypt.js');

// This function will be used to create a new user
async function signup(req, res) {
    // Get the user's email and password from the request body

    const { email, password, forename, surname, phoneNumber } = req.body;

    // Check that the user's email, password, forename and surname are not empty
    if (!email || !password || !forename || !surname) {
        return res.status(400).json({ error: 'Email, password, forename and surname are required' });
    }

    // Check if the user's email already exists
    const existingUser = await prisma.prisma.user.findUnique({
        where: {
            email: email
        }
    });

    // If the user's email already exists, return an error
    if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    // If the user's email doesn't exist, create a new user
    const newUser = await prisma.prisma.user.create({
        data: {
            email: email,
            password: await bcrypt.hashPassword(password),
            forename: forename,
            surname: surname,
            phoneNumber: phoneNumber ? phoneNumber : null
        }
    });

    // Generate a JWT token for the user
    const token = await jwt.generateToken(newUser);

    // Return the user's email and token
    return res.status(201).json({ email: newUser.email, token: token });
}

// This function will be used to login a user
async function login(req, res) {
    // Get the user's email and password from the request body
    const { email, password } = req.body;

    // Check that the user's email and password are not empty
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if the user's email exists
    const user = await prisma.prisma.user.findUnique({
        where: {
            email: email
        }
    });

    // If the user's email doesn't exist, return an error
    if (!user) {
        return res.status(400).json({ error: 'Email does not exist' });
    }

    // If the user's email exists, compare the password with the hash
    const passwordMatch = await bcrypt.comparePassword(password, user.password);

    // If the password doesn't match, return an error
    if (!passwordMatch) {
        return res.status(400).json({ error: 'Password is incorrect' });
    }

    // If the password matches, generate a JWT token for the user
    const token = await jwt.generateToken(user);

    // Return the user's email and token
    return res.status(200).json({ email: user.email, token: token });
}

// This function will be used to logout a user
async function logout(req, res) {
    // Check that the user's token is not empty
    if (!req.headers.authorization) {
        return res.status(400).json({ error: 'Token is required' });
    }

    // Get the user's token from the request headers
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    try {
        await jwt.verifyToken(token);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }

    // If the token is valid, return a success message
    return res.status(200).json({ message: 'Successfully logged out' });
}

module.exports = {
    signup,
    login,
    logout
};
