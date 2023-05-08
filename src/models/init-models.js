const DataTypes = require("sequelize").DataTypes;
const _banner = require("./banner");
const _cumRap = require("./cumRap");
const _datVe = require("./datVe");
const _ghe = require("./ghe");
const _heThongRap = require("./heThongRap");
const _lichChieu = require("./lichChieu");
const _loaiNguoiDung = require("./loaiNguoiDung");
const _nguoiDung = require("./nguoiDung");
const _phim = require("./phim");
const _rapPhim = require("./rapPhim");

function initModels(sequelize) {
  const banner = _banner(sequelize, DataTypes);
  const cumRap = _cumRap(sequelize, DataTypes);
  const datVe = _datVe(sequelize, DataTypes);
  const ghe = _ghe(sequelize, DataTypes);
  const heThongRap = _heThongRap(sequelize, DataTypes);
  const lichChieu = _lichChieu(sequelize, DataTypes);
  const loaiNguoiDung = _loaiNguoiDung(sequelize, DataTypes);
  const nguoiDung = _nguoiDung(sequelize, DataTypes);
  const phim = _phim(sequelize, DataTypes);
  const rapPhim = _rapPhim(sequelize, DataTypes);

  lichChieu.belongsToMany(nguoiDung, { as: 'id_nguoiDungs', through: datVe, foreignKey: "ma_lich_chieu", otherKey: "id" });
  nguoiDung.belongsToMany(lichChieu, { as: 'ma_lich_chieu_lichChieus', through: datVe, foreignKey: "id", otherKey: "ma_lich_chieu" });
  nguoiDung.belongsToMany(nguoiDung, { as: 'loai_nguoi_dung_nguoiDungs', through: loaiNguoiDung, foreignKey: "id", otherKey: "loai_nguoi_dung" });
  nguoiDung.belongsToMany(nguoiDung, { as: 'id_nguoiDung_loaiNguoiDungs', through: loaiNguoiDung, foreignKey: "loai_nguoi_dung", otherKey: "id" });
  rapPhim.belongsTo(cumRap, { as: "ma_cum_rap_cumRap", foreignKey: "ma_cum_rap"});
  cumRap.hasMany(rapPhim, { as: "rapPhims", foreignKey: "ma_cum_rap"});
  lichChieu.belongsTo(ghe, { as: "ma_ghe_ghe", foreignKey: "ma_ghe"});
  ghe.hasMany(lichChieu, { as: "lichChieus", foreignKey: "ma_ghe"});
  cumRap.belongsTo(heThongRap, { as: "ma_he_thong_rap_heThongRap", foreignKey: "ma_he_thong_rap"});
  heThongRap.hasMany(cumRap, { as: "cumRaps", foreignKey: "ma_he_thong_rap"});
  datVe.belongsTo(lichChieu, { as: "ma_lich_chieu_lichChieu", foreignKey: "ma_lich_chieu"});
  lichChieu.hasMany(datVe, { as: "datVes", foreignKey: "ma_lich_chieu"});
  datVe.belongsTo(nguoiDung, { as: "id_nguoiDung", foreignKey: "id"});
  nguoiDung.hasMany(datVe, { as: "datVes", foreignKey: "id"});
  loaiNguoiDung.belongsTo(nguoiDung, { as: "id_nguoiDung", foreignKey: "id"});
  nguoiDung.hasMany(loaiNguoiDung, { as: "loaiNguoiDungs", foreignKey: "id"});
  loaiNguoiDung.belongsTo(nguoiDung, { as: "loai_nguoi_dung_nguoiDung", foreignKey: "loai_nguoi_dung"});
  nguoiDung.hasMany(loaiNguoiDung, { as: "loai_nguoi_dung_loaiNguoiDungs", foreignKey: "loai_nguoi_dung"});
  banner.belongsTo(phim, { as: "ma_phim_phim", foreignKey: "ma_phim"});
  phim.hasMany(banner, { as: "banners", foreignKey: "ma_phim"});
  lichChieu.belongsTo(phim, { as: "ma_phim_phim", foreignKey: "ma_phim"});
  phim.hasMany(lichChieu, { as: "lichChieus", foreignKey: "ma_phim"});
  ghe.belongsTo(rapPhim, { as: "ma_rap_rapPhim", foreignKey: "ma_rap"});
  rapPhim.hasMany(ghe, { as: "ghes", foreignKey: "ma_rap"});
  lichChieu.belongsTo(rapPhim, { as: "ma_rap_rapPhim", foreignKey: "ma_rap"});
  rapPhim.hasMany(lichChieu, { as: "lichChieus", foreignKey: "ma_rap"});

  return {
    banner,
    cumRap,
    datVe,
    ghe,
    heThongRap,
    lichChieu,
    loaiNguoiDung,
    nguoiDung,
    phim,
    rapPhim,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
