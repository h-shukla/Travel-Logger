const mongoose = require("mongoose");
const { Schema } = mongoose;

const requiredString = {
    type: String,
    required: true,
};

const communitySchema = new Schema({
    name: requiredString,
    description: requiredString,
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    backgroundImgUrl: requiredString,
    comments: requiredString,
    members: {
        type: Number,
        default: 0
    }
});

const Community = mongoose.model("community", communitySchema);
module.exports = Community;
