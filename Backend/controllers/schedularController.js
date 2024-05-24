const fs = require('fs');
const cron = require('node-cron');
const got = require("got");
const qs = require('qs');
require('dotenv').config();


const updateAccessTokenInConfig = async (newAccessToken) => {
    try {
        const configPath = './config.json';

        const configFile = fs.readFileSync(configPath, 'utf-8');
        const config = JSON.parse(configFile);

        config.amadeus_access_token = newAccessToken;

        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        console.log('Access Token updated successfully in config.json');
    } catch (error) {
        console.error('Error while updating Access Token:', error);
    }
};

const updateConfig = async () => {
    try {
        const accessToken = await generateAccessToken();
        await updateAccessTokenInConfig(accessToken); 
        console.log("updated amadeus accessToken");
        return accessToken;
    } catch (error) {
        console.error('Error while updating config:', error);
    }
};

const generateAccessToken = async () => {
    try {
        const headers = {
            "Content-type": "application/x-www-form-urlencoded",
        };
        const requestData = {
            client_id: process.env.AMADEUS_CLIENT_ID,
            client_secret: process.env.AMADEUS_CLIENT_SECRET,
            grant_type: "client_credentials",
        };

        const url = `${process.env.AMADEUS_TOKEN_URL}`;

        const response = await got
            .post(url, {
                body: qs.stringify(requestData),
                headers: headers,
            })
            .json();

        return response?.access_token;
    } catch (error) {
        console.error(`Error while generating access token:`, error);
        return '';
    }
};


cron.schedule('0 * * * *', async () => {
    try {
        console.log('Updating config for amadeus access_token...');
        const accessToken = await updateConfig();
        console.log("accessToken Generated", accessToken);
    } catch (error) {
        console.log("Error while updating config for amadeus access_token:", error);
    }
});

module.exports = {
    updateConfig
};
