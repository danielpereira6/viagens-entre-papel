// const { Sequelize } = require("sequelize");
const { Sequelize } = require('@sequelize/core');
const { PostgresDialect } = require('@sequelize/postgres');

// PostgreSQL connection configuration
const sequelize = new Sequelize({
    dialect: PostgresDialect,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // Connection pool for better performance
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },

    //   // SSL for production (Render provides SSL)
    //   dialectOptions: process.env.NODE_ENV === "production" ? {
    //     ssl: {
    //       require: true,
    //       rejectUnauthorized: false,
    //     },
    //   } : {},

    //   logging: process.env.NODE_ENV === "development" ? console.log : false,
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log("✅ PostgreSQL connection successful");
    })
    .catch(err => {
        console.error("❌ Unable to connect to PostgreSQL:", err);
    });

module.exports = sequelize;