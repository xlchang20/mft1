var mongodb = require('mongodb');
var mongoose = require('mongoose');
//var MongoClient = mongodb.MongoClient;
var dburl = 'mongodb://MFT-admin:soupsandbowls@mft-cluster-shard-00-00-zw2ya.mongodb.net:27017,mft-cluster-shard-00-01-zw2ya.mongodb.net:27017,mft-cluster-shard-00-02-zw2ya.mongodb.net:27017/mongodblab?ssl=true&replicaSet=MFT-Cluster-shard-0&authSource=admin&retryWrites=true';
var retry = null;
mongoose.connect(dburl);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to MongoDB Atlas');
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

// For app termination
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
      });
  });

// For Heroku app termination
process.on('SIGTERM', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through app termination');
    process.exit(0);
    });
});

// For nodemon restarts
process.once('SIGUSR2', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through app termination');
    process.kill(process.pid, 'SIGUSR2');
    });
  });


// BRING IN YOUR SCHEMAS & MODELS
require('./firms.model');
require('./users.model');
