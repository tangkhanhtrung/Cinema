const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/reponse');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;


// Đặt vé  
const addBookingTicketMovie = async (req, res) => {
    try {
        let { id, ma_lich_chieu, ma_ghe } = req.body
        let checkIdUser = await model.datVe.findOne({
            where: {
                id, ma_lich_chieu, ma_ghe
            }
        })
        if (!checkIdUser) {
            let resuilt = await model.datVe.create({
                id,
                ma_lich_chieu,
                ma_ghe
            });
            sucessCode(res, { resuilt }, "Bạn đã đặt vé phim hành công !")
        }
        else {
            failCode( res, "vé đã được đặt")
        }
    }

    catch (err) {
        errorCode(res, "Lỗi Backend")
    }
}



// Lấy thông tin danh sách phòng vé
const getInfoTicketRoom = async (req, res) => {
    try {
        let { ma_lich_chieu } = req.params
        let ShowTimeMovie = await model.lichChieu.findAll({
            where: {
                ma_lich_chieu
            },
            include: [
                "ma_phim_phim", "ma_rap_rapPhim", "ma_ghe_ghe"
            ],

        });
        if (ShowTimeMovie) {
            sucessCode(res, { ShowTimeMovie }, "Lấy danh sách phòng vé thành công")
        }
        else {
            failCode(res, "Mã lịch chiếu phim không tồn tại")
        }
    } catch (err) {

        errorCode(res, "Lỗi Backend")
    }
}

// thêm Phim 
const addShowTimeMovie = async (req, res) => {
    try {
        let { ma_rap, ma_phim, ngay_gio_chieu, gia_ve, ma_ghe } = req.body
        let checShowTime = await model.phim.findOne({
            where: {
                ma_phim
            }
        })
        if (checShowTime) {
            let checkCodeTheater = await model.rapPhim.findOne({
                where: {
                    ma_rap
                }
            })
            if (checkCodeTheater) {
                let resuilt = await model.lichChieu.create({
                    ma_rap,
                    ma_phim,
                    ngay_gio_chieu,
                    gia_ve,
                    ma_ghe
                });
                sucessCode(res, { resuilt }, "Bạn đã thêm lịch chiếu phim hành công !")
            }
            else {
                failCode(res, "Mã rạp không tồn tại. Vui lòng chọn mã rạp khác!")

            }
        }
        else {
            failCode(res, "Mã phim không tồn tại. Vui lòng chọn mã phim khác!")
        }
    }
    catch (err) {
        errorCode(res, "Lỗi Backend")
    }
}




//commonjs module
module.exports = {
    getInfoTicketRoom, addShowTimeMovie, addBookingTicketMovie
}