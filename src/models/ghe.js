const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return ghe.init(sequelize, DataTypes);
}

class ghe extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ma_ghe: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ten_ghe: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    loai_ghe: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ma_rap: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'rapPhim',
        key: 'ma_rap'
      }
    }
  }, {
    sequelize,
    tableName: 'ghe',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
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
    ]
  });
  }
}
