const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return loaiNguoiDung.init(sequelize, DataTypes);
}

class loaiNguoiDung extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'nguoiDung',
        key: 'id'
      }
    },
    loai_nguoi_dung: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'nguoiDung',
        key: 'loai_nguoi_dung'
      }
    }
  }, {
    sequelize,
    tableName: 'loaiNguoiDung',
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
