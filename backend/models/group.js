"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Groups extends Model {
    static associate(models) {
      models.Group.hasMany(models.Food, { // join 1 => M
        foreignKey: "group_id", //fk's food table
        sourceKey: "id", //pk's group table
      });
    }
  }
  Groups.init(
    {
      name: DataTypes.STRING(200),
      detail: DataTypes.STRING(300),
    },
    {
      sequelize,
      modelName: "Group",
      tableName: "groups",
    }
  );
  return Groups;
};
