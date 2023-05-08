const express = require('express');
const userControllerRoute = express.Router();
const {getInfoUser,getNameUser,getNameUserDividePage,getListRolesUser,addUser,updateUser,deleteUser ,getUserDividedPage, getListUser} = require('../controllers/userController');
const {verifyToken} = require('../middlewares/jwtoken')

// userControllerRoute
userControllerRoute.get("/GetUserType",verifyToken,getListRolesUser);
userControllerRoute.get("/GetListUser",verifyToken,getListUser);
userControllerRoute.get("/GetListUserDividedPage",verifyToken,getUserDividedPage);
userControllerRoute.get("/GetUser",verifyToken,getNameUser);
userControllerRoute.get("/GetUserDividedPage",verifyToken,getNameUserDividePage);
userControllerRoute.get("/GetInfoUser",verifyToken,getInfoUser);
userControllerRoute.post("/AddUser",verifyToken,addUser);
userControllerRoute.put("/UpdateUser/:id",verifyToken,updateUser);
userControllerRoute.delete("/DeleteUser/:id",verifyToken,deleteUser);


module.exports = userControllerRoute;