'use strict';
module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    description: DataTypes.TEXT
  }, {
    timestamps: true,
    freezeTableName: true,
    tableName: 'projects'
  });
  Project.associate = function(models) {
    // associations can be defined here
    Project.hasMany(models.Milestone, {
      foreignKey: 'project_id'
    })
  };
  return Project;
};