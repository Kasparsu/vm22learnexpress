const {Sequelize, QueryTypes, DataTypes } = require('sequelize');
let sequelize = new Sequelize('sqlite:db.sqlite');

module.exports = sequelize.define('Movie', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT
    }
}, {tableName: 'movies', timestamps:false});