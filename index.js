const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/config/mongoose');
const userRoutes = require('./src/routes/userRoutes');
const urlRoutes = require('./src/routes/urlRoutes');
const {requireAuth,checkUser} = require('./src/middlewares/authMiddleware');
const urlController = require('./src/controllers/urlController');

const app = express();
connectDB();

// use miidleware
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());
app.set('view engine', 'ejs');

app.get('*', checkUser);
console.log(checkUser)
app.use('/', userRoutes);
app.use('/url', urlRoutes);
app.get('/list',requireAuth,urlController.getAllUrls);
app.get('/:shortUrl', urlController.redirectToOriginalUrl);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});