const { failCode} = require('../config/reponse')
const jwt = require('jsonwebtoken');
const key = "1234"

// tạo token
const createToken = (data) => {
    let token = jwt.sign({ content: data }, key, {algorithm: "HS256", expiresIn: "10y" });
    return token;
}


// kiểm tra token
const checkToken  = (token) => {
    try{
    let check = jwt.verify(token, key);
    if (check) {
        return { checkData: true, message: "" };
      } else {
        return { checkData: false, message: "Token không hợp lệ" };
      }
    } catch (error) {
      return { checkData: false, message: error.message };
    }
}

const verifyToken = (req, res, next) => {

    const { token } = req.headers;
    const verifyToken = checkToken(token);
    if (verifyToken.checkData) {
    next();
        } else {
    res.status(401).send(verifyToken.message);
  }


}

module.exports = {
    createToken,
    checkToken,
    verifyToken
}