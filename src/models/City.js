const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const City = sequelize.define('city', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    countryId: { //se refiere a las Iniciales de cada Pais, Ej: COL, ECU, ARG, VEN
        type: DataTypes.STRING(3),
        allowNull: false
    },
});

module.exports = City;