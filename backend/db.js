const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/inotebook"
// const mongoURI = process.env.MONGODB_URI;

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log("Connected to db 🔗...");
    } catch (error) {
        console.log("Error while connecting to db..." + error);
    }

}

module.exports = connectToMongo;
