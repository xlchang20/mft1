var mongoose = require('mongoose');
var Firm = mongoose.model('Firm');

// GET all criterias for a firm.
module.exports.criteriasGetAll = function(req,res){
    var firmID = req.params.firmID;
    console.log('[found in criterias.controller.js at line 7]GET firmID', firmID);

    // Getting one record by 
    Firm.findById(firmID).select('FIRM_NAME').exec(function(err, doc){
        console.log('Return doc', doc);
        res.status(200).json(doc);
    });
};

// GET single criteria for a firm.
module.exports.criteriasGetOne = function(req,res){
    var firmID = req.params.firmID;
    var criteria_notes_ID = req.params.criteria_notes_ID;
    console.log('GET criteria_notes_ID ' + criteria_notes_ID + ' for firmID ' + firmID);
  
    Firm
      .findById(firmID)
      .select('FIRM_NAME')
      .exec(function(err, firm) {
        var criteria_notes = firm.FIRM_NAME.id(criteria_notes_ID);
        res
          .status(200)
          .json(criteria_notes);
      });
};