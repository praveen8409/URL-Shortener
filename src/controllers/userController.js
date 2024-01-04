// Importing required modules
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
// Setting the expiration time for JWT token
const maxAge = 3 * 24 * 60 * 60;

// Function to create a JWT token with a given user ID
const createToken = (id) => {
    return jwt.sign({ id }, 'secret', {
        expiresIn: maxAge
    });
}

// User controller class containing signup, login, and logout methods
class UserController {
    // Render the signup page
    static async signup_get(req, res) {
        try {
            res.render('signup');
        } catch (error) {
            console.log(error.message);
        }

    }
    // Handle user signup
    static async signup_post(req, res) {
        try {
            const { name, email, password } = req.body;
            // console.log(name, email, password);
            const user = await User.create({ name, email, password });
            res.status(201).json(user);
        } catch (error) {
            console.log(error.message);
            const errors = handleErrors(error);
            res.status(500).json({ errors });

        }

    }
    // Render the login page
    static async login_get(req, res) {
        try {
            res.render('login');
        } catch (error) {
            // console.log(error.message);
        }

    }
    // Handle user login
    static async login_post(req, res) {
        const { email, password } = req.body;
        try {

            const user = await User.login(email, password);

            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });

            res.status(200).json({ user: user._id });
        } catch (error) {
            // console.log(error.message);
            const errors = handleErrors(error);
            res.status(500).json({ errors });
        }

    }
    // Logout and redirect to the login page
    static async logout_get(req, res) {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/login');
    }
}

// Function to handle errors during user signup and login
const handleErrors = (error) => {
    console.log(error.message, error.code);
    let errors = { email: '', password: '' };

    if (error.message === 'incorrect email') {
        errors.email = 'Email is incorrect';
    }
    if (error.message === 'incorrect password') {
        errors.password = 'Password is incorrect';
    }
    if (error.code === 11000) {
        errors.email = 'Email already exists';
        return errors;
    }

    if (error.message.includes('User validation failed')) {
        Object.values(error.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}
// Exporting the UserController class
module.exports = UserController;