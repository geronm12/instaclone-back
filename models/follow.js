
const mongoose = require("mongoose");


const Schema = mongoose.Schema;
 
const FollowSchema = Schema({
    idUser: {
        type: mongoose.ObjectId,
        require: true,
        ref: "User"
    },
    follow: {
        type: mongoose.ObjectId,
        require: true,
        ref: "User"
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Follow", FollowSchema);