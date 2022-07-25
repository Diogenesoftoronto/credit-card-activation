// imports
const express = require('express')
require('dotenv').config()
const axios = require('axios')
const path = require('path')
// const logger = require('morgan');
const serveStatic = require('serve-static')

const API_URL = 'https://us-west2-connexinterview.cloudfunctions.net/cardactivation'

// create app
const app = module.exports = express()

//  config for rendering with ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// log
// if (!module.parent) app.use(logger('dev'));

// config for axios headers
axios.defaults.headers.post['Authkey'] = process.env.AUTHKEY
// middleware for form response on the response body
app.use(express.urlencoded({ extended: true }));

// serve static files
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(serveStatic(path.join(__dirname, 'scripts')));

// checks if card is activated and sends the proper ejs template to the server for rendering.
async function isCardActivated(req, data) {
  try {
    res = await axios.post(API_URL, data)
    
    const values = {cardnumber: req.body.cardnumber, status: res.status, message: res.data.msg, responsecode: res.data.responsecode}
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

// post route for notifications
app.post('/notifications', (req, res) => {
  const data = JSON.stringify(req.body)
  const returned = isCardActivated(req, data)
  returned.then((result) => {
   const [ , values] = result
    res.json(values)
  })
})

// post route for activating the credit from the form data on the index
app.post('/activation', (req, res) => {
  const data = JSON.stringify(req.body)
  const returned = isCardActivated(req, data)
  returned.then((result) => {
   const [template, values] = result
    res.render(template, values)})
})

module.export = app;