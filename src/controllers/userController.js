const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/reponse');
const nguoiDung = require('../models/nguoiDung');
const { createToken } = require('../../src/middlewares/jwtoken')
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

// lấy danh sách loại người dùng  
const getListRolesUser = async (req, res) => {
    try {
        let getRolesUser = await model.loaiNguoiDung.findAll({});
        sucessCode(res, getRolesUser, "Lấy danh sách loại người dùng thành công")
    } catch (err) {
        failCode(res, "lỗi backend")
    }
}

// lấy danh sách người dùng 
const getListUser = async (req, res) => {
    try {
        let data = await model.nguoiDung.findAll();
        sucessCode(res, data, "Lấy danh sách người dùng thành công")
    } catch (err) {

        errorCode(res, "Lỗi Backend")
    }
}

// Lấy danh sách người dùng phân trang 
const getUserDividedPage = async (req, res) => {
    try {
        let { offset } = req.body;
        let limit = Math.ceil(await model.nguoiDung.count() / offset)
        let resuilt = await model.nguoiDung.findAll({
            limit, offset
        })
        let checkOffset = offset
        sucessCode(res, { resuilt, checkOffset }, "Bạn đã lấy danh sách phân trang thành công !")
    }
    catch (err) {
        errorCode(res, "Lỗi Backend")
        console.log(err)
    }
}

// Tìm kiếm người dùng 
const getNameUser = async (req, res) => {
    try {
        let { ho_ten } = req.body;
        let checkNameUser = await model.nguoiDung.findAll({
            where: {
                ho_ten: {
                    [Op.like]: `${ho_ten}%`
                }
            }
        });
        if (checkNameUser.length != 0) {
            sucessCode(res, checkNameUser, "Lấy dữ liệu theo tên thành công")
        }
        else {
            failCode(res, "Không có người nào có tên như vậy nha")
        };
    } catch (err) {

        errorCode(res, "Lỗi Backend")
    }
}

// Tìm kiếm người dùng phân trang 
const getNameUserDividePage = async (req, res) => {
    try {
        let { offset } = req.body;
        let { ho_ten } = req.body;
        let limit = Math.ceil(await model.nguoiDung.count() / offset);
        let checkNameUser = await model.nguoiDung.findAll({
            where: {
                ho_ten: {
                    [Op.like]: `${ho_ten}%`
                }
            },
            limit, offset
        });
        let checkOffset = offset
        if (checkNameUser.length != 0) {
            sucessCode(res, { checkNameUser, checkOffset }, "Lấy dữ liệu theo tên thành công")
        }
        else {
            failCode(res, "Không có người nào có tên như vậy nha")
        };
    } catch (err) {

        errorCode(res, "Lỗi Backend")
    }
}

// lấy thông tin người dùng
const getInfoUser = async (req, res) => {
    try {
        let { tai_khoan, mat_khau } = req.body;
        let getInfoUser = await model.nguoiDung.findOne({
            where: {
                tai_khoan,
                mat_khau
            }
        });
        if (getInfoUser) {
            sucessCode(res, getInfoUser, "Lấy thông tin người dùng thành công")
        }
        else {
            failCode(res, "Thông tin tài khoản không tồn tại ")
        }
    } catch (err) {

        errorCode(res, "Lỗi Backend")
    }
}

// thêm người dùng 
const addUser = async (req, res) => {
    try {
        let { tai_khoan, ho_ten, email, so_dt, loai_nguoi_dung, mat_khau } = req.body
        let checkUser = await model.nguoiDung.findOne({
            where: {
                email
            }
        })
        if (!checkUser) {
            let resuilt = await model.nguoiDung.create({
                tai_khoan,
                ho_ten,
                email,
                so_dt,
                loai_nguoi_dung,
                mat_khau
            });
            sucessCode(res, { resuilt }, "Bạn đã thêm người dùng hành công !")
        }
        else {
            failCode(res, "Email trên đã được đăng kí vui lòng đổi email khác !")
        }
    }
    catch (err) {
        errorCode(res, "Lỗi Backend")
    }
}

// Cập Nhật thông tin người dùng
const bcrypt = require('bcrypt');
const updateUser = async (req, res) => {
    try {
        let { id } = req.params;
        let { tai_khoan,
            ho_ten,
            email,
            so_dt,
            loai_nguoi_dung,
            mat_khau } = req.body;

        // Mã hóa mật khẩu hash
        let matKhauHash = bcrypt.hashSync(mat_khau, 10);
        let checkUser = await model.nguoiDung.findOne({
            where: {
                id
            }
        });
        if (checkUser) {
            let resuilt = await model.nguoiDung.update({
                tai_khoan,
                ho_ten,
                email,
                so_dt,
                loai_nguoi_dung,
                mat_khau: matKhauHash
            }, {
                where: {
                    id
                }
            });
            sucessCode(res, "Update user id " + `${id}` + " thành công");
        } else {
            failCode(res, "User không tồn tại !");
        }

    } catch (err) {
        errorCode(res, "Lỗi Backend")
    }
}

// Xóa người dùng 
const deleteUser = async (req, res) => {
    try {
        let { id } = req.params;
        let checkIdUser = await model.nguoiDung.findOne({
            where: {
                id
            }
        })
        if (checkIdUser) {
            let checkIdTicket = await model.datVe.findOne({
                where: {
                    id
                }
            })
            if (checkIdTicket) {
                let resuilt = await model.datVe.destroy({
                    where: {
                        id
                    }
                });
            }
            resuilt = await model.nguoiDung.destroy({
                where: {
                    id
                }
            });
            sucessCode(res, resuilt, "Bạn đã xóa người dùng có id: " + `${id}` + " thành công !")
        }
        else {
            failCode(res, "Id người dùng bạn muốn xóa ko tồn tại")
        }

    }
    catch (err) {
        errorCode(res, "Lỗi Backend")
        console.log(err)
    }
}



//commonjs module
module.exports = {
    getListRolesUser,
    getListUser,
    getUserDividedPage, 
    getNameUser,
    getNameUserDividePage,
    getInfoUser,  
    addUser, 
    updateUser, 
    deleteUser, 
  
}