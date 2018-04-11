'use strict';
module.exports = (sequelize, DataTypes) => {
  var Milestone = sequelize.define('Milestone', {
    name: DataTypes.STRING,
    leader_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    due_date: DataTypes.DATE
  }, {});
  Milestone.associate = function(models) {
    // associations can be defined here
    Milestone.belongsTo(models.User, {
      foreignKey: 'leader_id'
    }),
    Milestone.belongsTo(models.Project, {
      foreignKey: 'project_id'
    }),
    Milestone.hasMany(models.Task, {
      foreignKey: 'milestone_id'
    })
  };
  return Milestone;
};