const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return datVe.init(sequelize, DataTypes);
}

class datVe extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'nguoiDung',
        key: 'id'
      }
    },
    ma_lich_chieu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'lichChieu',
        key: 'ma_lich_chieu'
      }
    },
    ma_ghe: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'datVe',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "ma_lich_chieu" },
        ]
      },
      {
        name: "ma_lich_chieu",
        using: "BTREE",
        fields: [
          { name: "ma_lich_chieu" },
        ]
      },
    ]
  });
  }
}
