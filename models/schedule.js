"use strict";
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    "Schedule",
    {
      scheduleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      startAt: DataTypes.DATE,
      endAt: DataTypes.DATE,
      repeated: DataTypes.BOOLEAN
    },
    {}
  );
  Schedule.associate = function(models) {
    // associations can be defined here
  };
  return Schedule;
};
