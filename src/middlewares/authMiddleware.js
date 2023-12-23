// Importing required modules
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();

// Middleware for authenticating user access
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    // Check if a token exists
    if (token) {
        // Verify the token and execute the callback
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            // Handle token verification errors
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                // Proceed to the next middleware or route
                next();
            }
        })
    } else {
        // Redirect to the login page if no token exists
        res.redirect('/login');
    }
}
// Middleware for checking user authentication status
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    // Check if a token exists
    if (token) {
        // Verify the token and execute the callback
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
            // Handle token verification errors
            if (err) {
                // Set user to null in local variables and proceed to the next middleware or route
                res.locals.user = null;
                next();
            } else {
                // Retrieve user information from the database based on the decoded token
                let user = await userModel.findById(decodedToken.id);
                // Set user information in local variables and proceed to the next middleware or route
                res.locals.user = user;
                next();
            }

        });
    } else {
        // Set user to null in local variables and proceed to the next middleware or route if no token exists
        res.locals.user = null;
        next();
    }
}
// Exporting the requireAuth and checkUser middlewares for use in other modules
module.exports = { requireAuth, checkUser };