var dbconn = require('../data/dbconnection.js');
var mongoose = require('mongoose');
var Firm = mongoose.model('Firm');

module.exports.firmsGetAll = function(req, res) {
  
  var offset = 0;
  var count = 5;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  Firm.find().skip(offset).limit(count).exec(function(err, firms){
    console.log("Found firms", firms.length);
    res.json(firms);
  });
};

// Get record by _id
module.exports.firmsGetOne = function(req, res) {
  var firmId = req.params.firmId;
  console.log('GET firmID', firmId);

  // Getting one record by 
  Firm.findById(firmId).exec(function(err, doc){
    res.status(200).json(doc);
  });
};