const mongoose = require('mongoose');

const connectToDB = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DB_URL).then((data) => {
        console.log(`mongodb connected to ${data.connection.host}`);
    });
};

module.exports = connectToDB;
