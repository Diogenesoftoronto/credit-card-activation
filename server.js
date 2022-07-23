
const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
const axios = require('axios')
const path = require('path')
const serveStatic = require('serve-static')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
//  config for rendering with ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// config for axios headers
axios.defaults.headers.post['Authkey'] = process.env.AUTHKEY

async function isCardActivated(data) {
  const status = await axios.post('https://us-west2-connexinterview.cloudfunctions.net/cardactivation', data)
  .catch((err)=>console.log("error:", "bad guy"))
  .then((status)=>
    console.log("status: nooo"))
  return status
}

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.post('/activation', (req, res) => {
  const data = JSON.stringify(req.body)
  console.log(data)
  axios.post('https://us-west2-connexinterview.cloudfunctions.net/cardactivation', data)
  .then((res) =>{
   console.log("status: hello", res) 
   res.render('success.ejs', {cardnumber: req.body.cardnumber, status: res.response.status, message: res.response.data.msg, responsecode: res.response.data.responsecode})
  }
    )
    .catch((err)=>{console.log("error:", err.response.data, err.response.status,)
  
    res.render('failure.ejs', {cardnumber: req.body.cardnumber, status: err.response.status, message: err.response.data.msg, responsecode: err.response.data.responsecode})  
  })
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
