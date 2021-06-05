const express = require('express')
const app = express()

const controller = require('./controller')
const { bootstrapApps } = require('./urls.model')
const { scheduleHealthChecks } = require('./services/healthChecker.service')
const { loadApps } = require('./services/persistence.service')

app.use(express.json())

app.get('/health', (req, res) => res.send('checker running ok :)'))

app.post('/urls', controller.store)

app.patch('/urls/:name', controller.update)

app.delete('/urls/:name', controller.remove)

scheduleHealthChecks()
bootstrapApps(loadApps())

app.listen(4223, () => console.log('> server running at http://localhost:4223'))
