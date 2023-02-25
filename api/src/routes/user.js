var express = require('express');
var router = express.Router();

// Import the user controller
const userController = require('../controllers/user.js');

// signup route
router.post('/signup', (req, res) => {
    userController.signup(req, res);
});

// login route
router.post('/login', (req, res) => {
    userController.login(req, res);
});

// logout route
router.post('/logout', (req, res) => {
    userController.logout(req, res);
});

module.exports = router;
