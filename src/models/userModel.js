// Importing necessary modules
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bycrpt = require('bcrypt');

// Defining the user schema using mongoose
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Name"],
        minlength: [4, "Minimum Name Length is 4 characters"]

    },
    email: {
        type: String,
        required: [true, "Please Enter Email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
        minlength: [6, "Minimum Password Length is 6 characters"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Static method for user login
userSchema.statics.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('incorrect email');
    }
    const isMatch = await bycrpt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('incorrect password');
    }
    return user;
}

// Middleware to hash the password before saving to the database
userSchema.pre('save', async function (next) {
    // hash the palin password
    const salt = await bycrpt.genSalt(10);
    this.password = await bycrpt.hash(this.password, salt);
    next();
})
// Creating the User model
const User = mongoose.model('User', userSchema);

// Exporting the User model for use in other modules
module.exports = User;