const CommonGotApi = require('./commonGot.api');
const config = require('../config.json');
const { updateConfig } = require('../controllers/schedularController');

class MLModelServiceAPI {
    async fetchOptimisedRoutes(from, to) {
        try {

            return [{ lat: "", long: "" }, { lat: "", long: "" }, { lat: "", long: "" }, { lat: "", long: "" }, { lat: "", long: "" }];

            let apiUrl = `https://mlmodel-service-url:3000/getOptimisedRoutes`;

            const body = {
                from: from,
                to: to
            }

            const response = await CommonGotApi.fetchDataWithRetryPost(apiUrl, body);
            return response?.data?.json;

        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }

    }
}

module.exports = MLModelServiceAPI;





