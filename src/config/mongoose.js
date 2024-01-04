// Importing required modules
const mongoose = require('mongoose');
require('dotenv').config();
const DB = 'mongodb+srv://praveen:praveen@praveenclustor.frwy0xs.mongodb.net/urlShortner?retryWrites=true&w=majority';

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
          // Connecting to MongoDB using the provided URL
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
           
        });
         // Logging a success message upon successful connection
        console.log("Connected to MONGODB ...")
    } catch (err) {
           // Handling errors during the connection process
        console.error('Error connecting to database : ', err);
    }
}
// Exporting the connectDB function for use in other modules
module.exports = connectDB;