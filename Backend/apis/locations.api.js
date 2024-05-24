const CommonGotApi = require('./commonGot.api');
const config = require('../config.json');
const { updateConfig } = require('../controllers/schedularController');

// const apiKey = process.env.AMADEUS_ACCESS_TOKEN;


class LocationsApi {
    async fetchAirportsLocations(subType = 'AIRPORT', keyword) {
        try {
            let apiUrl = `https://test.api.amadeus.com/v1/reference-data/locations`;

            if(subType && keyword){
                apiUrl += `?subType=${subType}&keyword=${keyword}&page[limit]=5&`
            }

            const apiKey = config?.amadeus_access_token || updateConfig;
            
            const response = await CommonGotApi.fetchDataWithRetryGet(apiUrl, apiKey);
            return response?.data;

        } catch (error) {
            throw new Error(`Error fetching linkedin contact profile data: ${error.message}`);
        }

    }
}

module.exports = LocationsApi;





