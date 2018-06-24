var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
// Connection url
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'paragon';
// Connect using MongoClient

router.get('/list', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.collection("mailings").findOne({}, function(err, result) {
      if (err) throw err;
      res.send(result)
      db.close();
    });
  });
});

router.post('/add', function(req,res,next) {
  var user = JSON.parse(req.body)
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.collection("mailings").insert(user, function(error) {
      if(error) {
        res.send(error);
      } else {
        res.send("200 OK")
      }
    })});
  });

module.exports = router
