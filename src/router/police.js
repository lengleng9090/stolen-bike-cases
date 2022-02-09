const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')

const policeService = require('../service/police')
const reportService = require('../service/report')

router.post('/login', async (req, res)=>{
    try{
        const chunck = await policeService.login(req.body.username,req.body.password)
        res.status(201).send(chunck)
    }
    catch(error){
        res.status(error.statusCode ? error.statusCode:500).send({error:error.message})
    }
})

router.delete('/logout', async (req,res)=>{
    try{
        await policeService.logout(req.headers.authorization)
        res.send()
    }catch(error){
        res.status(error.statusCode ? error.statusCode:500).send({error:error.message})
    }
})

router.get('/report/getall', auth, async (req,res)=>{
    try{
        const reports = await reportService.getAll()
        res.send({reports})
    }catch(error){
        res.status(error.statusCode ? error.statusCode:500).send({error:error.message})
    }
})

module.exports = router