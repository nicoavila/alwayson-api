'use strict';
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    milestone_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'tasks'
  });
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.Milestone, {
      foreignKey: 'milestone_id'
    }),
    Task.belongsTo(models.User, {
      foreignKey: 'user_id'
    })
  };
  return Task;
};