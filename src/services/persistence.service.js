const path = require('path')
const fs = require('fs')

const appsFilePath = path.join(__dirname, '../../apps.json')

function loadApps() {

  try {
    if (fs.existsSync(appsFilePath)) {
      return require(appsFilePath)
    }
  } catch (error) {
    // console.error(error)
    console.log('Apps JSON does not exists.')
  }
}

function saveState(apps) {
  try {
    fs.writeFileSync(appsFilePath, JSON.stringify(apps))
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  loadApps,
  saveState
}
