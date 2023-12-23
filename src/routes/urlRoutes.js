const express = require('express');
const urlController = require('../controllers/urlController');
const {checkUser} = require('../middlewares/authMiddleware');


const router = express.Router();
router.use(checkUser);
router.get('/',(req,res)=> res.render('url'));
router.post('/shorten', urlController.shortenUrl);
router.get('/:shortUrl', urlController.redirectToOriginalUrl);

module.exports = router;