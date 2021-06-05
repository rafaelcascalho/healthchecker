const cron = require('node-cron')
const axios = require('axios')

const { listUrls, listNames, getApps, updateStatus } = require('../urls.model')

function webhookMesage({ name, status, url }) {
  return `[ MONITOR ] Alert: ${name} is ${status} ( ${url} )`
}

async function informStatus({ name, status }) {
  const stateChanged = updateStatus({ name, status })
  if (!stateChanged) return
  
  const urlsCtx = getApps()
  const ctx = urlsCtx[name]
  if (status === 'DOWN') {
    return axios.post(ctx.webhook, { content: webhookMesage({ name, status: 'DOWN', url: ctx.url }) })
  } else {
    return axios.post(ctx.webhook, { content: webhookMesage({ name, status: 'UP', url: ctx.url }) })
  }
}

async function analyzeResults(results) {
  const end = results.length
  const names = listNames()
  let result
  const requests = []
  for(let i = 0; i < end; i++) {
    result = results[i]
    if (result.status === 'fulfilled') {
      requests.push(informStatus({ name: names[i], status: 'UP' }))
    } else {
      requests.push(informStatus({ name: names[i], status: 'DOWN' }))
    }
  }
  console.log(requests)
  await Promise.allSettled(requests)
}

function scheduleHealthChecks() {
  cron.schedule('* * * * *', async () => {
    const urls = listUrls()
    const healthChecks = urls.map(async url => axios.get(url))
    try {
      const results = await Promise.allSettled(healthChecks)
      await analyzeResults(results)
    } catch (error) {
      console.error(error)
    }
  })
}

module.exports = {
  scheduleHealthChecks
}
