// imports
const express = require("express");
require("dotenv").config();
const axios = require("axios");
const path = require("path");
const { body, validationResult } = require('express-validator');
// const logger = require('morgan');
const serveStatic = require("serve-static");

const API_URL =
  "https://us-west2-connexinterview.cloudfunctions.net/cardactivation";

// create app
const app = (module.exports = express());

//  config for rendering with ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// log
// if (!module.parent) app.use(logger('dev'));

// config for axios headers
axios.defaults.headers.post["Authkey"] = process.env.AUTHKEY;
// middleware for form response on the response body
app.use(express.urlencoded({ extended: true }));

// serve static files
app.use(serveStatic(path.join(__dirname, "public")));
app.use(serveStatic(path.join(__dirname, "scripts")));

// checks if card is activated and sends the proper ejs template to the server for rendering.
async function isCardActivated(req, data) {
  try {
    res = await axios.post(API_URL, data);
    console.log("success", req.body);

    const values = {
      cardnumber: req.body.cardnumber,
      status: res.status,
      message: res.data.msg,
      responsecode: res.data.responsecode,
    };
    return ["success.ejs", values];
  } catch (err) {
    console.log(req.body);
    const values = {
      cardnumber: req.body.cardnumber,
      status: err.response.status,
      message: err.response.data.msg,
      responsecode: err.response.data.responsecode,
    };
    return ["failure.ejs", values];
  }
}

// post route for activating the credit from the form data on the index
app.post("/activation", 
body("cardnumber")
  .isLength({ allow_leading_zeroes: true, min: 16, max: 16 })
  .withMessage("Card number must be 16 digits long"),
  body("csv")
  .isLength({ allow_leading_zeroes: true, min: 3, max: 3 })
  .withMessage("CSV must be 3 digits long"),
  body("expirydata")
  .isLength({ allow_leading_zeroes: true, min: 4, max: 4 })
  .withMessage("Expiry date must be 4 digits long"),
  body("phonenumber")
  .isLength({ min: 10, max: 10 })
  .withMessage("Phone number must be 10 digits long"),
(req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render('failure.ejs' , { cardnumber: req.body.cardnumber,
          csv: req.body.csv,
          expirydata: req.body.expirydata,
          phonenumber: req.body.phonenumber, errors: errors.array() });
      }
  
        const validated = {
        cardnumber: req.body.cardnumber,
        csv: req.body.csv,
        expirydata: req.body.expirydata,
        phonenumber: req.body.phonenumber,
      }
        const data = JSON.stringify(validated);
        console.log(Object.keys(req), req.body, va);
        const returned = isCardActivated(req, data);
        returned.then((result) => {
          const [template, values] = result;
          res.render(template, values);
        });
    }
  );




app.use(express.json());
// add server side validation for the form with express-validator
app.post(
  '/notifications',
  body("cardnumber")
  .isLength({ allow_leading_zeroes: true, min: 16, max: 16 })
  .withMessage("Card number must be 16 digits long"),
  body("csv")
  .isLength({ allow_leading_zeroes: true, min: 3, max: 3 })
  .withMessage("CSV must be 3 digits long"),
  body("expirydata")
  .isLength({ min: 4, max: 4 })
  .withMessage("Expiry date must be 4 digits long"),
  body("phonenumber")
  .isLength({ min: 10, max: 10 })
  .withMessage("Phone number must be 10 digits long"),
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(req.body, errors);
      return res.status(400).json({ errors: errors.array() });
    }

      const validated ={
      cardnumber: req.body.cardnumber,
      csv: req.body.csv,
      expirydata: req.body.expirydata,
      phonenumber: req.body.phonenumber,
    }
      const data = JSON.stringify(validated);
      console.log(data);
      const returned = isCardActivated(req, data);
      returned.then((result) => {
        const [, values] = result;
        res.json(values);
      })
    
  }
);
// home route for form page
app.get("/", (req, res) => {
  res.render("index.ejs");
});


// post route for notifications
// app.post("/notifications", (req, res) => {
//   const data = JSON.stringify(req.body);
//   console.log(data);
//   const returned = isCardActivated(req, data);
//   returned.then((result) => {
//     const [, values] = result;
//     res.json(values);
//   });
// });



module.export = app;
