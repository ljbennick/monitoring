const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

const rollbar = new Rollbar({
    accessToken: 'aedf3b95ee864207b0158f6d315f8d85',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Take us to warp ${port}`))