const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    }
});

const airplaneDetailsSchema = new mongoose.Schema({
    uniqueSearchId: String,
    from: {
        type: locationSchema,
        required: true
    },
    to: {
        type: locationSchema,
        required: true
    },
    airplaneType: String,
    DepartureTime: String,
    weight: String,
    callSign: String,
}, { timestamps: true });

const AirplaneDetails = mongoose.model('AirplaneDetails', airplaneDetailsSchema);

module.exports = AirplaneDetails;
