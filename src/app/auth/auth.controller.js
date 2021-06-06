const { storeApp, removeUrl, updateApp } = require('../core/urls.model')

function all(req, res) {
  return 'NIY'
}

function show(req, res) {
  return 'NIY'
}

function store(req, res) {
  storeApp(req.body)
  return res.status(201).send('app registered')
}

function remove(req, res) {
  const name = req.params['name']
  if (!name) return res.status(400).json({ error: 'name param is missing' })

  removeUrl(name)
  return res.status(204).send()
}

function update(req, res) {
  const name = req.params['name']
  if (!name) return res.status(400).json({ error: 'name param is missing' })

  updateApp({ name, ...req.body })
  return res.send('app registry updated')
}

module.exports = { all, show, store, update, remove }
