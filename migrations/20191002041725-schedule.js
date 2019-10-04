"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Schedules", {
      scheduleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: Sequelize.STRING,
      description: Sequelize.TEXT,
      createdAt: Sequelize.DATE,
      startAt: Sequelize.DATE,
      endAt: Sequelize.DATE,
      repeated: Sequelize.BOOLEAN
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Schedules");
  }
};
