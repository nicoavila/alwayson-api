'use strict';
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    milestone_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};