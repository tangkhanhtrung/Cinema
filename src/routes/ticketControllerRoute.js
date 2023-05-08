const express = require('express');
const ticketControllerRoute = express.Router();
const {getInfoTicketRoom,addShowTimeMovie,addBookingTicketMovie} = require('../controllers/ticketController');
const {verifyToken} = require('../middlewares/jwtoken')



ticketControllerRoute.post("/Booking",verifyToken,addBookingTicketMovie); 
ticketControllerRoute.get("/GetBookingPlaceList/:ma_lich_chieu",verifyToken,getInfoTicketRoom);
ticketControllerRoute.post("/CreateMovieDate",verifyToken,addShowTimeMovie);




module.exports = ticketControllerRoute;
