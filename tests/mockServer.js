const express = require('express')
const app = express()

app.get('/health', (req, res) => res.send('mock server is up'))

app.listen(3000, () => console.log('> [mock] server running at http://localhost:3000'))
