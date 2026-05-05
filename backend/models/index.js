const sequelize = require("../config/database");

const User = require("./User");
const Book = require("./Book");

const initModels = () => {
  // relations later
};

// Sync database
sequelize.sync();

module.exports = { sequelize, initModels, User, Book };