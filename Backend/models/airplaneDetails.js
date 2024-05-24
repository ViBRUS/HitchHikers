const mongoose = require('mongoose');

const airplaneDetailsSchema = new mongoose.Schema({
    uniqueSearchId: String,
    from: String,
    to: String,
    airplaneType: String,
    DepartureTime: String,
    weight: String,
    callSign: String,
}, { timestamps: true });

const AirplaneDetails = mongoose.model('AirplaneDetails', airplaneDetailsSchema);

module.exports = AirplaneDetails;
