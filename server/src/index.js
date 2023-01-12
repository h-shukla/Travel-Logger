const dotenv = require('dotenv');
const express = require('express');
const connectToDB = require('./db.js');

// config file for dotenv
dotenv.config({ path: './.env'});

// constant definitions
const app = express();
const port = process.env.PORT || 5000;
connectToDB();

app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
});
