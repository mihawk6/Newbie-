const express = require('express');
var router = express.Router();
const mysql = require('mysql');
var connection  = require('../database.js');
var session=require('express-session');
const { runInNewContext } = require('vm');

const app = express();


router.get('/prodesc', function(req, res) {
    var sql='SELECT * FROM product';
   
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('prodesc', { title: 'productlist', proDesc: data});
  });
});
module.exports = router;
