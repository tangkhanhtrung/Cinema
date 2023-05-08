//tạo ra các API trong các đối tượng Route

//GET POST PUT DELETE
const express = require('express');
const authRoute = express.Router();
const {signUp, login } = require('../controllers/authController');


// SignUp 
authRoute.post("/signUp",signUp);
authRoute.post("/login",login)

module.exports = authRoute;
