'use strict';
module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    description: DataTypes.TEXT
  }, {
    timestamps: true
  });
  Project.associate = function(models) {
    // associations can be defined here
   
  };
  return Project;
};