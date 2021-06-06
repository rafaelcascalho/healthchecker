const routes = require('express').Router()

const controller = require('./monitor.controller')

routes
  .route('/monitors')
  .get(controller.all)
  .post(controller.store)

routes
  .route('/monitors/:id')
  .get(controller.show)
  .put(controller.update)
  .patch(controller.update)

routes.delete('/monitors/:id', controller.destroy)

module.exports = routes
