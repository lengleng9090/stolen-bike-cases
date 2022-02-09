const Report = require('../model/report')
const {Police} = require('../model/police')
const Petitioner = require('../model/petitioner')

exports.getAll = async () => {
    try{
        const report = await Report.findAll({
            include:[{
                model: Police,
                as: 'police',
                attributes:{
                    exclude: ['police_id','username','password']
                }
            },{
                model: Petitioner,
                as: 'petitioner'
            }],
            attributes:{
                exclude: ['police_id','petitioner_id']
            }
        })

        return report
    }catch(error){
        throw error
    }
}

exports.getByCitizenId = async (citizenId) => {
    try{
        const reports = Report.findAll({
            include:[{
                model: Petitioner,
                as: 'petitioner',
                where:{
                    citizen_id: citizenId
                }
            },{
                model: Police,
                as: 'police',
                attributes:{
                    exclude: ['police_id','username','password']
                }
            }],
            attributes:{
                exclude: ['police_id','petitioner_id']
            }
        })

        return reports
    }catch(error){
        throw error
    }
}

exports.create = async (data, petitionerId) => {
    const police = await Police.findOne({where:{
        status:'ACTIVE'
    }})

    data.status = police ? 'IN_PROCESS' : 'WATING'



    await Report.create(data)

}
