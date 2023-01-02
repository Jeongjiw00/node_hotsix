"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.user.hasMany(models.review, { foreignKey: 'user_id' });
      models.user.hasMany(models.laundry, { foreignKey: "id" });
      models.user.hasOne(models.laundry, { foreignKey: "id" });
    }
  }
  user.init(
    {
      userId: {
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nickname: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      phoneNumber: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      point: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
