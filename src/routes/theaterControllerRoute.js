const express = require('express');
const theaterControllerRoute = express.Router();
const {getInfoTheaterSystem,getInfoTheaterCluster,getInfoShowTimeTheaterSystem,getInfoShowTimeMovie} = require('../controllers/TheaterController');
const {verifyToken} = require('../middlewares/jwtoken')



theaterControllerRoute.get("/GetInfoTheaterSystem/:ma_he_thong_rap",verifyToken,getInfoTheaterSystem);
theaterControllerRoute.get("/GetInfoTheaterCluster/:ma_he_thong_rap",verifyToken,getInfoTheaterCluster);
theaterControllerRoute.get("/getInfoShowTimeTheaterSystem/:ma_he_thong_rap",verifyToken,getInfoShowTimeTheaterSystem);
theaterControllerRoute.get("/getInfoShowTimeMovie/:ma_phim",verifyToken,getInfoShowTimeMovie);




module.exports = theaterControllerRoute;
