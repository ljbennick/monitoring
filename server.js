const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

const rollbar = new Rollbar({
    accessToken: 'aedf3b95ee864207b0158f6d315f8d85',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const students = []
const app = express()
app.use(express.json())


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})

app.post('/api/student', (req, res)=>{
    const {name} = req.body
    name = name.trim()
    
    students.push(name)
    
    rollbar.log('Student added successfully', {author: 'Jaxon', type: 'manual entry'})
    
    
    res.status(200).send(students)
})

const port = process.env.PORT || 4545

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`Take us to warp ${port}`))