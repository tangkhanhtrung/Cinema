const express = require('express');
const rootRoute = express.Router();
const authRoute = require('./authRoute');
const userControllerRoute = require('./userControllerRoute');
const MovieControllerRoute = require('./movieControllerRoute');
const theaterControllerRoute = require('./theaterControllerRoute');
const ticketControllerRoute = require('./ticketControllerRoute');

rootRoute.use("/UserAuth", authRoute);
rootRoute.use("/UserController", userControllerRoute);
rootRoute.use("/MovieController", MovieControllerRoute);
rootRoute.use("/TheaterController", theaterControllerRoute);
rootRoute.use("/BookingController", ticketControllerRoute);


module.exports = rootRoute;