const Petitioner = require('../model/petitioner') 
const { Police } = require('../model/police')
const Report = require('../model/report')

exports.create = async (body) => {
    try{
        if(Object.keys(body).length == 0){
            const createError = new Error('Invalid Input!')
            createError.statusCode = 400
            throw createError
        }

        await Petitioner.create(body)
    }catch(error){
        throw error
    }
}
