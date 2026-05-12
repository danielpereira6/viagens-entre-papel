const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres");

const Trip = sequelize.define("Trip", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  photos: {
    type: DataTypes.JSON, // array of base64 or URLs
    allowNull: true,
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: "trips",
  timestamps: true,
});

module.exports = Trip;