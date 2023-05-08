const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return lichChieu.init(sequelize, DataTypes);
}

class lichChieu extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ma_lich_chieu: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ma_rap: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'rapPhim',
        key: 'ma_rap'
      }
    },
    ma_phim: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'phim',
        key: 'ma_phim'
      }
    },
    ngay_gio_chieu: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gia_ve: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ma_ghe: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ghe',
        key: 'ma_ghe'
      }
    }
  }, {
    sequelize,
    tableName: 'lichChieu',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ma_lich_chieu" },
          { name: "ma_rap" },
          { name: "ma_phim" },
          { name: "ma_ghe" },
        ]
      },
      {
        name: "ma_rap",
        using: "BTREE",
        fields: [
          { name: "ma_rap" },
        ]
      },
      {
        name: "ma_phim",
        using: "BTREE",
        fields: [
          { name: "ma_phim" },
        ]
      },
      {
        name: "ma_ghe",
        using: "BTREE",
        fields: [
          { name: "ma_ghe" },
        ]
      },
    ]
  });
  }
}
