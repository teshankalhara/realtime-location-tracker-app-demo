const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
    },
});

const LocationModel = mongoose.model("Location", locationSchema);

module.exports = LocationModel;
