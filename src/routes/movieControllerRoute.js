const express = require('express');
const MovieControllerRoute = express.Router();
const {getBanner,getMovie,getMovieByName,getMovieByDate,addMovie,updateMovie,getMovieDividedPage,deleteMovie,getMovieByID} = require('../controllers/movieController');
const {verifyToken} = require('../middlewares/jwtoken')

 MovieControllerRoute.get("/GetListBanner",getBanner);
 MovieControllerRoute.get("/GetListMovie",verifyToken,getMovie);
 MovieControllerRoute.get("/GetListMovieByName",verifyToken,getMovieByName);
 MovieControllerRoute.get("/GetMovieDividedPage", verifyToken,getMovieDividedPage);
 MovieControllerRoute.get("/GetMovieByDate",verifyToken,getMovieByDate);
 MovieControllerRoute.post("/AddMovie",verifyToken,addMovie);
 MovieControllerRoute.put("/UpdateMovie/:ma_phim",verifyToken,updateMovie);
 MovieControllerRoute.delete("/DeleteMovie/:ma_phim",verifyToken,deleteMovie);
 MovieControllerRoute.get("/GetMovieInfo/:ma_phim",verifyToken,getMovieByID);



module.exports = MovieControllerRoute;
