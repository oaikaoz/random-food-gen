"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Foods extends Model {
    static associate(models) {
      models.Food.belongsTo(models.Group, { // join M => 1
        as: "group",
        foreignKey: "group_id", //fk's food table
        sourceKey: "id", //pk's group table
      });
    }
  }
  Foods.init(
    {
      name: DataTypes.STRING(200),
      detail: DataTypes.STRING(300),
      shop_name: DataTypes.STRING(200),
      group_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Food",
      tableName: "foods",
    }
  );
  return Foods;
};
