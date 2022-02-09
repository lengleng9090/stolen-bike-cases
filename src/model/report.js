const { DataTypes } = require('sequelize')

const {Police} = require('./police')
const Petitioner = require('./petitioner')

const sequelize = require('../db/sequelize')

const Report = sequelize.define('report',{
    report_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    description:{
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    status:{
        type: DataTypes.STRING(45),
    }
})

Report.belongsTo(Petitioner,{
    foreignKey: 'petitioner_id',
    as:'petitioner'
})

Report.belongsTo(Police, {
    foreignKey: 'police_id',
    allowNull: true,
    as: 'police'
})

module.exports = Report