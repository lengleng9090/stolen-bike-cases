const jwt = require('jsonwebtoken')

const {Police,PoliceToken} = require('../model/police')

exports.login = async (username, password) => {
    try{
        const police = await Police.verify(username,password);
        const token = jwt.sign({police_id:police.police_id},process.env.JWT_SECRET)
        await PoliceToken.create({token,police_id:police.police_id})

        delete police.dataValues.password
        delete police._previousDataValues.password
        
        return {police,token,tokenType:'Bearer'}
    }
    catch(error){
        throw error
    }
}

exports.logout = async (authorization) =>{
    try{
        const token = authorization.replace('Bearer ','')
        await PoliceToken.destroy({where:{
            token
        }})
    }catch(error){
        throw error
    }
}
