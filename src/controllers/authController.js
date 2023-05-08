const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/reponse');
const nguoiDung = require('../models/nguoiDung');
const { createToken } = require('../middlewares/jwtoken')


//đăng nhập tài khoản
const login = async (req, res) => {
    try {
        let { email, mat_khau } = req.body;

        let checkLogin = await model.nguoiDung.findOne({
            where: {
                email
            }
        });
        if (checkLogin) {
            let checkPass = bcrypt.compareSync(mat_khau, checkLogin.mat_khau);
            if (checkPass) {
                sucessCode(res, createToken(checkLogin), "Login thành công");
            }
            else {
                failCode(res, { email, mat_khau }, " Mật khẩu không đúng !")

            }
        } else {
            failCode(res, { email, mat_khau }, " Email không đúng !")
        }

    } catch (err) {
        errorCode(res, "Lỗi Backend")
    }

}

// Đăng Ký
const bcrypt = require('bcrypt');
const signUp = async (req, res) => {
    let { tai_khoan, ho_ten,email, so_dt,loai_nguoi_dung,mat_khau } = req.body
    let matKhauHash = bcrypt.hashSync(mat_khau, 10);
    let checkEmail = await model.nguoiDung.findOne({
        where: {
            email
        }
    })
    if (checkEmail) {
        failCode(res, "email đã tồn tại")
    }
    else {

        let data = await model.nguoiDung.create({
            tai_khoan, 
            ho_ten,
            email, 
            so_dt,
            loai_nguoi_dung:"khachHang",
            mat_khau : matKhauHash
        });
        sucessCode(res, data, "đăng ký tài khoản thành công");
    }
}

//commonjs module
module.exports = {
    signUp, login
}