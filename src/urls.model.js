const { saveState } = require('./services/persistence.service')

/**
 * App { name: { url, wbehook, lastStatus, lastChecked } }
 */
let APPS = {}

function bootstrapApps(apps) {
  if (!apps) return

  APPS = Object.assign(apps, {})
}

function getApps() {
  return Object.assign(APPS, {})
}

function listNames() {
  return Object.keys(APPS)
}

function listUrls() {
  return Object.keys(APPS).map(item => APPS[item].url)
}

function storeApp({ url, name, webhook }) {
  if (!(name in APPS)) {
    APPS[name] = { url, webhook, lastStatus: 'IDLE' }
  }
  saveState(APPS)
}

function removeUrl({ name }) {
  delete APPS[name]
  saveState(APPS)
}

function updateApp({ name, url, webhook }) {
  if (url) APPS[name].url = url
  if (webhook) APPS[name].webhook = webhook
  saveState(APPS)
}

function updateStatus({ name, status }) {
  if (APPS[name].lastStatus === status) return false

  APPS[name].lastStatus = status
  APPS[name].lastChecked = new Date().getTime()
  return true
}

module.exports = {
  getApps,
  storeApp,
  listUrls,
  removeUrl,
  updateApp,
  listNames,
  updateStatus, 
  bootstrapApps,
}
