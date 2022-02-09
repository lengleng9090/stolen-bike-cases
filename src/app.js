const petitionerRouter = require('./router/petitioner')
const policeRouter = require('./router/police')
const express = require('express')
const app = express()
const port = process.env.PORT

app.use(express.json())

app.use('/petitioner',petitionerRouter)
app.use('/police', policeRouter)

app.get('/health', (req, res)=>{
    res.send({ status:'This service are healthly.'})
})

app.listen(port, ()=>{
    console.log(`App are running on port ${port}`)
})