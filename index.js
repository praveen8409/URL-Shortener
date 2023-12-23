// Importing required modules and setting up the Express app
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/config/mongoose');
const userRoutes = require('./src/routes/userRoutes');
const urlRoutes = require('./src/routes/urlRoutes');
const { requireAuth, checkUser } = require('./src/middlewares/authMiddleware');
const urlController = require('./src/controllers/urlController');
require('dotenv').config();
// Creating an instance of the Express app
const app = express();
// Connecting to the MongoDB database
connectDB();

// Applying middleware
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());
app.set('view engine', 'ejs');

// Middleware to check user authentication on every route
app.get('*', checkUser);
console.log(checkUser)
app.use('/', userRoutes);
app.use('/url', urlRoutes);
app.get('/list', requireAuth, urlController.getAllUrls);
app.get('/:shortUrl', urlController.redirectToOriginalUrl);


// Starting the server on port 
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});