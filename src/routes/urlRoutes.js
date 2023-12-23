const express = require('express');
const urlController = require('../controllers/urlController');
const {checkUser,requireAuth} = require('../middlewares/authMiddleware');


const router = express.Router();
router.use(checkUser);
router.get('/',requireAuth,(req,res)=> res.render('url'));
router.post('/shorten', requireAuth,urlController.shortenUrl);




module.exports = router;