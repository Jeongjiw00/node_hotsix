"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class laundry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.laundry.belongsTo(models.user, { foreignKey: "id" });
      models.laundry.belongsTo(models.user, { foreignKey: "id" });
      models.laundry.hasOne(models.review, { foreignKey: "laundryId" });
    }
  }
  laundry.init(
    {
      laundryId: {
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      laundryName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      laundryContent: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      laundryAddress: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      laundryImg: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      requests: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.TINYINT(4),
        defaultValue: 0,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "laundry",
    }
  );
  return laundry;
};
