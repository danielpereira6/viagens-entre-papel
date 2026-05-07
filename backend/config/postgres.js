const { Sequelize } = require("sequelize");
// const { Sequelize } = require('@sequelize/core');
// const { PostgresDialect } = require('@sequelize/postgres');

// PostgreSQL connection configuration
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // Connection pool for better performance
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },

      // SSL for production (Render provides SSL)
    //   dialectOptions: process.env.NODE_ENV === "prod" ? {
    //     ssl: {
    //       require: true,
    //       rejectUnauthorized: false,
    //     },
    //   } : {},

      logging: process.env.NODE_ENV === "dev" ? console.log : false,
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });

module.exports = sequelize;