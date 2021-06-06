const routes = require('express').Router()

const controller = require('./auth.controller')

routes.post('/auth/login', controller.login)
routes.get('/auth/logout', controller.logout)

module.exports = routes
