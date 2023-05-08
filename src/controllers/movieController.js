const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/reponse');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

// lấy danh sách Banner 
const getBanner = async (req, res) => {
    try {
        let data = await model.banner.findAll();
        sucessCode(res, data, "Lấy danh sách Banner thành công")
    } catch (err) {
        
        errorCode(res, "Lỗi Backend")
    }
}

// lấy toàn bộ danh sách Phim 
const getMovie = async (req, res) => {
    try {
        let data = await model.phim.findAll();
        sucessCode(res, data, "Lấy danh sách phim thành công")
    } catch (err) {
        
        errorCode(res, "Lỗi Backend")
    }
}

// Lấy thông tin Phim theo tên phim
const getMovieByName = async (req, res) => {
    try {
        let {ten_phim} = req.body;
        let checkNameMovie = await model.phim.findAll({
            where: {
                ten_phim: {
                    [Op.like]: `${ten_phim}%`
                }
            }
        });
        if(checkNameMovie.length != 0) {
            sucessCode(res, checkNameMovie, "Lấy danh sách theo tên phim thành công")
      }
       else{
        failCode(res,"phim không tồn tại")
        };
    } catch (err) {
        errorCode(res, "Lỗi Backend")
    }
}
// Lấy danh sách phim phân trang 
const getMovieDividedPage = async (req, res) => {
    try {
        let { offset } = req.body;
        let limit = Math.ceil(await model.phim.count() / offset);
        let resuilt = await model.phim.findAll({
            limit, offset
        })
        let checkOffset = offset
        sucessCode(res, { resuilt, checkOffset }, "Bạn đã lấy danh sách phim phân trang thành công !")
    }
    catch (err) {
        errorCode(res, "Lỗi Backend")
        console.log(err)
    }
}

// lấy danh sách phim theo ngày
const getMovieByDate = async (req, res) => {
    try {
        let {ngay_khoi_chieu, ten_phim} = req.body;
        let checkMovie = await model.phim.findAll({
            where: {
                ten_phim,
                ngay_khoi_chieu
            }
        });
        if(checkMovie.length != 0) {
            sucessCode(res, checkMovie, "Lấy danh sách phim theo ngày thành công")
        }
       else{
        failCode(res,"Ngày"+`${checkMovie}`+"Không có phim nào cả")
        };
    } catch (err) {
        errorCode(res, "Lỗi Backend")
    }
}

// thêm Phim 
const addMovie = async (req, res) => {
    try {
        let { ten_phim,trailer,hinh_anh,mo_ta,ngay_khoi_chieu,danh_gia,hot,dang_chieu,sap_chieu} = req.body
        let checkMovie = await model.phim.findOne({
            where: {
                ten_phim
            }
        })
        if (!checkMovie) {
            let resuilt = await model.phim.create({
                ten_phim,
                trailer,
                hinh_anh,
                mo_ta,
                ngay_khoi_chieu,
                danh_gia,
                hot,
                dang_chieu,
                sap_chieu
            });
            sucessCode(res, {resuilt }, "Bạn đã thêm phim hành công !")
        }
        else {
            failCode(res, "Phim đã tồn tại. Vui lòng đổi phim khác!")
        }
    }
    catch (err) {
        errorCode(res, "Lỗi Backend")
    }
}

// Cập Nhật thông tin Phim
const updateMovie = async (req, res) => {
    try {
        let { ma_phim } = req.params;
        let { ten_phim,trailer,hinh_anh,mo_ta,ngay_khoi_chieu,danh_gia,hot,dang_chieu,sap_chieu} = req.body

        let checkMovie = await model.phim.findOne({
            where: {
                ma_phim
            }
        });
        if (checkMovie) {
        let resuilt =  await model.phim.update({
                ten_phim,
                trailer,
                hinh_anh,
                mo_ta,
                ngay_khoi_chieu,
                danh_gia,
                hot,
                dang_chieu,
                sap_chieu
            }, {
                where: {
                    ma_phim
                }
            });
            sucessCode(res,resuilt ,"Update phim có id là "+`${ma_phim}`+" thành công");
        } else {
            failCode(res, "Mã Phim có id là "+`${ma_phim}`+" không tồn tại !");
        }

    } catch (err) {
        console.log(err)
        errorCode(res, "Lỗi Backend")
    }
}

//Xóa phim
const deleteMovie = async (req, res) => {
    try {
        let {ma_phim} = req.params;
        let checkIdMovie = await model.phim.findOne({
            where: {
                ma_phim
            }
        });
        if (checkIdMovie) {
            let checkBanner = await model.banner.findOne({
                where: {
                    ma_phim
                }
            });
            if(checkBanner) {
                letDelBanner = await model.banner.destroy({
                    where: {
                        ma_phim
                    }
                });
            }
            let checkLichChieu = await model.lichChieu.findOne({
                where: {
                    ma_phim
                }
            });
            if(checkLichChieu) {
                letDelBanner = await model.lichChieu.destroy({
                    where: {
                        ma_phim
                    }
                });
            }
            let delPhim = await model.phim.destroy({
                where: { ma_phim },
              });


            sucessCode(res,delPhim, "Xóa phim thành công");
        }else {
            failCode(res, "Phim Không tồn tại!");
        }
        
    } catch (err) {
        errorCode(res, "Lỗi Backend")
    }
}

//lấy thông tin phim theo ID
const getMovieByID = async (req, res) => {
    try {
        let {ma_phim} = req.params;
        let checkMovie = await model.phim.findOne({
            where: { ma_phim }
        });
        if(checkMovie) {
            sucessCode(res, checkMovie, "Lấy Thông tin phim thành công")
      }
       else{
        failCode(res,"phim không tồn tại")
        };
    } catch (err) {
        errorCode(res, "Lỗi Backend")
    }
}



//commonjs module
module.exports = {
    getBanner,
    getMovie,
    getMovieByName,
    getMovieDividedPage,
    getMovieByDate,
    addMovie,
    updateMovie,
    deleteMovie,
    getMovieByID  
}