const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/config/mongoose');
const userRoutes = require('./src/routes/userRoutes');
const {requireAuth,checkUser} = require('./src/middlewares/authMiddleware');

const app = express();
connectDB();

// use miidleware
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());
app.set('view engine', 'ejs');

app.get('*', checkUser);
app.get('/dashboard', requireAuth, (req, res) => res.render('dashboard'));
app.use('/', userRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});