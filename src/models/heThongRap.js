const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return heThongRap.init(sequelize, DataTypes);
}

class heThongRap extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ma_he_thong_rap: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ten_he_thong_rap: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'heThongRap',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ma_he_thong_rap" },
        ]
      },
    ]
  });
  }
}
