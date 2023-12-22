const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'secret', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {

                let user = await userModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }

        });
    }else{
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };