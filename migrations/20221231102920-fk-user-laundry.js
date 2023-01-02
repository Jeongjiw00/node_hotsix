"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // laundry 테이블 userId 생성
    await queryInterface.addColumn("laundries", "userId", {
      allowNull: false,
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("laundries", {
      fields: ["userId"],
      type: "foreign key",
      name: "fk_laundry_userId",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    // laundry 테이블 adminId 생성
    await queryInterface.addColumn("laundries", "adminId", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("laundries", {
      fields: ["adminId"],
      type: "foreign key",
      name: "fk_laundry_adminId",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
