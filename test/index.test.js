// imports
const axios = require('axios')
// test server code
// test front end once server exists
// test whether form inputs are correct
// test whether form fields allow you to 
const API_URL = 'https://us-west2-connexinterview.cloudfunctions.net/cardactivation'
const MOCKREQ = {body: { cardnumber: '12345'}}
const MOCKDATAFAIL = {response: {status: '400', msg: 'activation failed', responsecode: '101'}}
const MOCKDATASUCCESS = {response: {status: '200', msg: 'activation success', responsecode: '100'}}
// async function isCardActivated(req, data) {
//   try {
//     res = await axios.post(API_URL, data)
//     const values = {cardnumber: req.body.cardnumber, status: res.response.status, message: res.response.data.msg, responsecode: res.response.data.responsecode}
//     return ['success.ejs', values]
//   }
//   catch (err) {
//     const values = {cardnumber: req.body.cardnumber, status: err.response.status, message: err.response.data.msg, responsecode: err.response.data.responsecode}
//     return ['failure.ejs', values]
//   }
// }
// test('the data is mock failure or mock success', done => {
//   function isCardActivated(MOCKREQ, MOCKDATAFAIL) {
//     try {
//       expect(data).toBe(MOCKDATASUCCESS);
//       done();
//     } catch (error) {
//       expect(error).toBe(MOCKDATAFAIL);
//       done(error);
//     }
//   }
//   fetchData(isCardActivated);
// });

// test('the data is peanut butter', () => {
//   return expect(isCardActivated()).resolves.toBe('peanut butter');
// });

// test('the data is peanut butter', () => {
//   return expect(isCardActivated()).resolves.toBe('peanut butter');
// });

function sum(a, b) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});