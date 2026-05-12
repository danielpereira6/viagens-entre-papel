const sequelize = require("../config/postgres");

// const User = require("./User");
const Book = require("./Books.pg");
const Trip = require("./Trip.pg");
const Love = require("./Love.pg");

// Sync database
sequelize.sync();

module.exports = { 
  sequelize,
  Book,
  Trip,
  Love
};