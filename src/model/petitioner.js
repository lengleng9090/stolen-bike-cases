const { DataTypes } = require('sequelize')

const sequelize = require('../db/sequelize')

const Petitioner = sequelize.define('petitioner',{
    petitioner_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    fname:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    lname:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    citizen_id:{
        type: DataTypes.STRING(13),
        allowNull: false
    }
})

module.exports = Petitioner