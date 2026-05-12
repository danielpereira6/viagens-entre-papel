const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres");

const Love = sequelize.define("Love", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quote: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: "love_quotes",
  timestamps: true,
});

module.exports = Love;