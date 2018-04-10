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
    })
  };
  return Milestone;
};