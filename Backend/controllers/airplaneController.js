const { mapAirportFields } = require("../utilities/helper");
const LocationsApi = require('../apis/locations.api');
const AirplaneDetails = require('../models/airplaneDetails'); // Import the AirplaneDetails model
const NodeCache = require('node-cache');
const config = require('../config.json');
const { v5: uuidv5 } = require('uuid');
require('dotenv').config();

const airportCache = new NodeCache({ stdTTL: 60 * 60 }); // Cache TTL set to 1 hour

class AirplaneController {
    async getAirportsList(req, res) {
        const { keyword, subType } = req.query;
        if (!keyword) {
            return res.json({
                success: false,
                message: "Enter Airport Name",
            });
        }

        const cacheKey = `${keyword}_${subType}`;

        try {
            let allAirportLocations = airportCache.get(cacheKey);
            if (!allAirportLocations) {
                const locationsApi = new LocationsApi();
                allAirportLocations = await locationsApi.fetchAirportsLocations(subType, keyword);
                airportCache.set(cacheKey, allAirportLocations);
            }

            const mappedAirports = allAirportLocations.map(mapAirportFields);

            res.json({
                success: true,
                airports: mappedAirports,
            });
        } catch (error) {
            console.error('Error fetching airport locations:', error);
            res.json({
                success: false,
                message: 'Failed to fetch airport locations',
            });
        }
    }


    async saveDetails(req, res) {
        const { from, to, airplaneType, DepartureTime, weight, callSign } = req?.body;

        if (!from || !to || !airplaneType || !DepartureTime || !weight || !callSign) {
            return res.json({
                success: false,
                message: "Missing either fields: [ from, to, airplaneType, DepartureTime, weight, callSign ]",
            });
        }


        try {
            const uniqueSearchId = uuidv5(callSign + DepartureTime.toString(), config.namespace);
            const airplaneDetails = new AirplaneDetails({
                uniqueSearchId,
                from,
                to,
                airplaneType,
                DepartureTime,
                weight,
                callSign,
                timestamp: new Date()
            });

            await airplaneDetails.save();

            res.json({
                success: true,
                message: 'Airplane details saved successfully.'
            });
        } catch (error) {
            console.error('Error saving airplane details:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to save airplane details.'
            });
        }
    }
}

module.exports = AirplaneController;





