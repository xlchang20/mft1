var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var dburl = 'mongodb://MFT-admin:soupsandbowls@mft-cluster-shard-00-00-zw2ya.mongodb.net:27017,mft-cluster-shard-00-01-zw2ya.mongodb.net:27017,mft-cluster-shard-00-02-zw2ya.mongodb.net:27017/mongodblab?ssl=true&replicaSet=MFT-Cluster-shard-0&authSource=admin&retryWrites=true';

var _connection = null;

var open = function() {
    MongoClient.connect(dburl, function(err, db) {
      if (err) {
        console.log("DB connection failed");
        return;
      }
      //_connection = db.db('firms');
      _connection = db;
      console.log("DB connection open");
      //db.close();
    });
  };

  var get = function() {
    return _connection;
  };

  module.exports = {
    open : open,
    get : get
  };