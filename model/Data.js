const mongoose = require('mongoose');

const DataSheet = new mongoose.Schema({
    name: { type: String, required: true },
    photo: { type: String, required: true },
    stats: { type: [Number], required: true },
});

const Data = mongoose.model("Data", DataSheet);
module.exports = Data;