// imports
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
// config for axios headers
axios.defaults.headers.post['Authkey'] = process.env.AUTHKEY

app.use(express.urlencoded({ extended: true }));

// checks if card is activated and sends the proper ejs template to the server for rendering.
async function isCardActivated(req, data) {
  try {
    res = await axios.post('https://us-west2-connexinterview.cloudfunctions.net/cardactivation', data)
    const values = {cardnumber: req.body.cardnumber, status: res.response.status, message: res.response.data.msg, responsecode: res.response.data.responsecode}
    return ['success.ejs', values]
  }
  catch (err) {
    const values = {cardnumber: req.body.cardnumber, status: err.response.status, message: err.response.data.msg, responsecode: err.response.data.responsecode}
    return ['failure.ejs', values]
  }
}
// home route for form page
app.get('/', (req, res) => {
  res.render('index.ejs')
})

// post route for activating the credit from the form data on the index
app.post('/activation', (req, res) => {
  const data = JSON.stringify(req.body)
  const returned = isCardActivated(req, data)
  returned.then((result) => {
   const [template, values] = result
    res.render(template, values)})
})

app.listen(port, () => {
  console.log(`Credit app listening on port ${port}`)
})
