"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // review 테이블 laundryId 생성
    await queryInterface.addColumn("Reviews", "laundryId", {
      allowNull: false,
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("Reviews", {
      fields: ["laundryId"],
      type: "foreign key",
      name: "fk_review_laundryId",
      references: {
        table: "laundries",
        field: "laundryId",
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
