"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("laundries", {
      laundryId: {
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      laundryName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      laundryContent: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      laundryAddress: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      laundryImg: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      requests: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.TINYINT(4),
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("laundries");
  },
};
