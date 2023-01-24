const mongoose = require("mongoose");
const { Schema } = mongoose;

const requiredString = {
    type: String,
    required: true,
};

const requiredNum = {
    type: Number,
    required: true,
};

const logSchema = new Schema({
    title: requiredString,
    comments: requiredString,
    longitude: requiredNum,
    latitude: requiredNum,
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: Schema.Types,
        ref: "user",
    },
});

const Log = mongoose.model("log", logSchema);
module.exports = Log;
