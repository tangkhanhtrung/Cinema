const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return rapPhim.init(sequelize, DataTypes);
}

class rapPhim extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ma_rap: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ten_rap: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ma_cum_rap: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cumRap',
        key: 'ma_cum_rap'
      }
    }
  }, {
    sequelize,
    tableName: 'rapPhim',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ma_rap" },
        ]
      },
      {
        name: "ma_cum_rap",
        using: "BTREE",
        fields: [
          { name: "ma_cum_rap" },
        ]
      },
    ]
  });
  }
}
