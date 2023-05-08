const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return nguoiDung.init(sequelize, DataTypes);
}

class nguoiDung extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tai_khoan: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ho_ten: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    so_dt: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mat_khau: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    loai_nguoi_dung: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'nguoiDung',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "loai_nguoi_dung" },
        ]
      },
    ]
  });
  }
}
