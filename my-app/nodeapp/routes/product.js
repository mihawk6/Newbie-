const express = require('express');
var router = express.Router();
const mysql = require('mysql');
var connection  = require('../database.js');

const app = express();

router.get('/product', function(req, res) {
  console.log("sds");
    var sql='SELECT * FROM product';
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('product', { title: 'productlist', productData: data});
  });
});


module.exports = router;
