const mongoose = require("mongoose");


const pointSchema = new mongoose.Schema({
    x: {
        type: Number,
        unique: false,
        required: true
    },
    y: {
        type: Number,
        unique: false,
        required: true
    },
    user: {
        type: String,
        unique: true,
        required: true
    }
})

var Point = mongoose.model("point", pointSchema);
module.exports = Point;