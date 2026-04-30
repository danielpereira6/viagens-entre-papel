const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Book = sequelize.define("Book",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true },
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1, max: 5 },
        },
        opinion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        coverImage: {
            type: DataTypes.TEXT, // for base64
            allowNull: true,
        },
        viewCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        isPublished: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'Book',
        tableName: 'books',
        timestamps: true,
    }
);

module.exports = Book;