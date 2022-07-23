
const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
const axios = require('axios')
const path = require('path')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
async function isCardActivated(req, res) {
  const status = await axios.post(req.body)
  return status
}
app.use('/static', express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
  res.render('./views/index')
})

app.post('/activation', (req, res) => {
  
  res.render(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})