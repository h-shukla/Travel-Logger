const mongoose = require("mongoose");

const connectToDB = () => {
    // required for compatibility issues
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_URL).then((data) => {
        console.log(`mongodb connected to ${data.connection.host}`);
    });
};

module.exports = connectToDB;
