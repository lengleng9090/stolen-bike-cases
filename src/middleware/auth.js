const jwt = require('jsonwebtoken')

const {Police,PoliceToken} = require('../model/police')

const auth = async function (req, res, next){
    try{
        const token = req.header('Authorization').replace('Bearer ','')

        const policeToken = await PoliceToken.findOne({where:{
            token
        }})

        if(!policeToken){
            throw new Error
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const police = await Police.findOne({
            where:{
                police_id:decoded.police_id
            },
            attributes:{
                exclude: ['password']
            }
        })

        req.police = police

        next()
    }catch(error){
        res.status(401).send({error:'Please authenticate.'})
    }
}

module.exports = auth