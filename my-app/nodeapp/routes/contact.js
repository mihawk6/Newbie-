const express = require('express');
var router = express.Router();
const mysql = require('mysql');
var connection  = require('../database.js');

const app = express();

router.get('/contact', function(req, res) {
  console.log("sds");
    res.render('contact');
  });


module.exports = router;
