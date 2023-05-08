const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return banner.init(sequelize, DataTypes);
}

class banner extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ma_banner: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hinh_anh: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ma_phim: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'phim',
        key: 'ma_phim'
      }
    }
  }, {
    sequelize,
    tableName: 'banner',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ma_banner" },
        ]
      },
      {
        name: "ma_phim",
        using: "BTREE",
        fields: [
          { name: "ma_phim" },
        ]
      },
    ]
  });
  }
}
