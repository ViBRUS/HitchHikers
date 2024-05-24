const express = require('express');
const cors = require('cors');
const userRouter = require('../routes/userData.router');
const airplaneRouter = require('../routes/airplane.router');
const accessRouter = require('../routes/accessToken.router');

module.exports = function (app) {
  // Enable CORS with origin and credentials
  app.use(cors({ origin: RegExp(process.env.CORS_URL, 'i'), credentials: true }));

  app.use(express.json({ limit: '50mb' }));

  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  
  app.get('/', (req, res) => {
    res.send('Welcome To Hitchhikers Group');
  });

  app.use('/api/user', userRouter);
  app.use('/api/airplane', airplaneRouter);
  app.use('/api/security', accessRouter);
};
