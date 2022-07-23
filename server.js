
const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
const axios = require('axios')
const path = require('path')
const serveStatic = require('serve-static')
//  config for rendering with ejs
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

async function isCardActivated(req) {
  const status = await axios.post('https://us-west2-connexinterview.cloudfunctions.net/cardactivation', req.body)
  console.log(status)
  return status
}

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.post('/activation', (req, res) => {
  result = isCardActivated(req) ? 'success.ejs' : 'failure.ejs' 
  res.render(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})