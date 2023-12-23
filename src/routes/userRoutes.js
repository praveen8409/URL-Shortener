const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const jwt = require('jsonwebtoken');


// router.get('/', (req, res) => {
//     const token = req.cookies.jwt;
//     if(token){
//         jwt.verify(token, 'secret', (err, decodedToken) => {
//             if(err){
//                 res.redirect('/login');
//             }
//             else{
//                 res.render('home');
//             }
//         });
//     }
//     else{
//         res.redirect('/login');
//     }
// });


router.get('/', (req, res) => res.redirect('/url'));
router.get('/login',userController.login_get);
router.post('/login',userController.login_post);
router.get('/signup',userController.signup_get);
router.post('/signup',userController.signup_post);
router.get('/logout',userController.logout_get);


module.exports = router;