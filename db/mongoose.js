const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URL, {

}, (err, res) => {
    try {
        console.log("Successfully connected to MongoDB database!")
    } catch (err) {
        throw err;
    }
})