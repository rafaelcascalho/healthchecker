const routes = require('express').Router()

const controller = require('./user.controller')

routes
  .route('/users')
  .get(controller.all)
  .post(controller.store)

routes
  .route('/users/:id')
  .get(controller.show)
  .put(controller.update)
  .patch(controller.update)

routes.delete('/users/:id', controller.destroy)

module.exports = routes
