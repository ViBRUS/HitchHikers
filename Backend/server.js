const express = require('express');
const app = express();
const chalk = require('chalk');

// Load environment variables from .env file
require('dotenv').config();

// Establish connection to MongoDB
require('./services/database.service')();

// Set up routes
require('./startup/routes')(app);

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection happened at', promise, `reason: ${reason}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error(`Uncaught Exception happened :${err}`);
});

// Handle SIGTERM signal
process.on('SIGTERM', (err) => {
    console.error('Received SIGTERM signal', err);
});

// Start the server
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, async () => {
    console.log(chalk.bold.green(`Listening on port ${PORT} . . .`));
    // console.log(`Listening to Port ${PORT}...`)
    console.log('Press Ctrl+C to stop');
});
