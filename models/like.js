const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LikeSchema = Schema({

    idPublication: {
        type: mongoose.ObjectId,
        require: true,
        ref: "Publication"
    },
    idUser: {
        type: mongoose.ObjectId,
        require: true,
        ref: "User"
    }


});


module.exports = mongoose.model("Like", LikeSchema);