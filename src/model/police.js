const bcrypt = require('bcrypt')
const { DataTypes } = require('sequelize')

const sequelize = require('../db/sequelize')

const Police = sequelize.define('police',{
    police_id:{
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
    username:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    password:{
        type: DataTypes.STRING(200),
        allowNull: false
    },
    status:{
        type: DataTypes.STRING(45),
        allowNull: false
    }
})

Police.beforeCreate(async (police, options) => {
    const hashPassword = await bcrypt.hash(police.password, 8)
    police.password = hashPassword
})

Police.verify = async function (username, password){
    const police = await Police.findOne({where:{
        username
    }})

    if(!police){
        const error = new Error('username or password are invalid')
        error.statusCode = 403
        throw error
    }

    const matchPassword = await bcrypt.compare(password, police.password)

    if(!matchPassword){
        const error = new Error('username or password are invalid')
        error.statusCode = 403
        throw error
    }

    return police
}

const PoliceToken = sequelize.define('police_token',{
    token:{
        type: DataTypes.STRING(200),
        primaryKey: true,
        allowNull: false
    },
},{
    timestamps: true,
    createdAt: 'create_at',
    updatedAt: false
})

PoliceToken.removeAttribute('id')


PoliceToken.belongsTo(Police,{
    foreignKey: 'police_id',
    as:'police'
})

module.exports = {Police,PoliceToken}