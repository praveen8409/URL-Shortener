const mongoose = require('mongoose');
const DBURI = "mongodb+srv://praveen:praveen@praveenclustor.frwy0xs.mongodb.net/urlShortner";
const connectDB = async () => {
    try {
        await mongoose.connect(DBURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
           
        });
        console.log("Connected to MONGODB ...")
    } catch (err) {
        console.error('Error connecting to database : ', err);
    }
}

module.exports = connectDB;