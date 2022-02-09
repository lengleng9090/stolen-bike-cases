const express = require('express')
const router = express.Router()

const reportService = require('../service/report')
const petitionerService = require('../service/petitioner')

router.get('/get/:citizenId', async (req, res)=>{
    try{
        const reports = await reportService.getByCitizenId(req.params.citizenId)
        res.send({reports})
    }catch(error){
        res.status(500).send({error:error.message})
    }
})

router.post('/create', async (req,res) =>{
    try{
        await petitionerService.create(req.body)
        res.send({status:'create successful!'})
    }catch(e){
        res.status(e.statusCode ? e.statusCode : 500).send({error:e.message})
    }
})

module.exports = router