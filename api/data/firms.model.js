var mongoose = require('mongoose');

var firmSchema = new mongoose.Schema({
  FIRM_NAME : {type : String, requried : true},
  STARS : {type : Number,min : 0,max : 5,default : 0},
  URL : String,
  FIRM_NOTES : [String],
  1 : String, // location
  CREATE_DATE : {type:Date, require:true}
});

// 'third paramter' will be the collection name. It's optional, but it'll automatically
// create thsi table followed by the first paramter with lower case first letter
// and pluralize into the database.
mongoose.model('Firm', firmSchema);