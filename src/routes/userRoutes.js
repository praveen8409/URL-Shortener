// Importing the express module to create a router
const express = require('express');
// Importing the userController for handling user-related routes
const userController = require('../controllers/userController');
// Importing the jsonwebtoken module for working with JSON Web Tokens
const jwt = require('jsonwebtoken');
// Creating an instance of the express router
const router = express.Router();


// Route to redirect the root URL to the '/url' route
router.get('/', (req, res) => res.redirect('/url'));
router.get('/login', userController.login_get);
router.post('/login', userController.login_post);
router.get('/signup', userController.signup_get);
router.post('/signup', userController.signup_post);
router.get('/logout', userController.logout_get);

// Exporting the router for use in other modules
module.exports = router;