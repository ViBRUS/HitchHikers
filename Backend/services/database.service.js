const mongoose = require('mongoose');
const chalk = require('chalk');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../', '.env') });

const dbUrl = process.env.MONGO_URL;

module.exports = async () => {
    let retryCount = 1;
    const maxRetries = 5;
    let retryDelayMs = 100;

    // Retry connection with exponential backoff
    while (retryCount < maxRetries) {
        try {
            console.log("About to connect to MongoDB");
            await mongoose.connect(dbUrl);
            console.log("Connected to MongoDB");
            break;
        } catch (error) {
            console.error('Error in MongoDB connection. Retrying...', retryDelayMs, 'ms Retry Count:', retryCount, error);
            await new Promise((resolve) => setTimeout(resolve, retryDelayMs * 2 ** retryCount));
            retryDelayMs *= 2 ** retryCount;
            retryCount++;
            if (retryCount === maxRetries) {
                // Exit the process if maximum retries reached
                process.exit(0);
            }
        }
    }

    // MongoDB connection event handlers
    mongoose.connection.on('connected', () => {
        console.log(chalk.bold.green(`Connected to MongoDB: ${dbUrl}`));
    });

    mongoose.connection.on('error', (err) => {
        console.log(chalk.bold.red(`MongoDB error occurred: ${err}`));
    });

    mongoose.connection.on('disconnected', () => {
        console.log(`MongoDB disconnected`);
    });

    // Handle application termination
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log(`MongoDB disconnected due to application termination`);
            process.exit(0);
        });
    });
};
