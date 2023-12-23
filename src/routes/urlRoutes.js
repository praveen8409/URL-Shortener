// Importing the express module to create a router
const express = require('express');


// Importing the UrlController and middleware functions
const urlController = require('../controllers/urlController');
const { checkUser, requireAuth } = require('../middlewares/authMiddleware');

// Creating an instance of the express router
const router = express.Router();
// Applying middleware to check user authentication for all routes
router.use(checkUser);
// Route for rendering the 'url' view when accessing the root URL
router.get('/', requireAuth, (req, res) => res.render('url'));
// Route for handling URL shortening when receiving a POST request
router.post('/shorten', requireAuth, urlController.shortenUrl);




// Exporting the router for use in other modules
module.exports = router;