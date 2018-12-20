require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./api/routes');


//app.set('port', 3000);
app.set('port', process.env.PORT || 3000);



app.use(function(req,res,next){
    console.log(req.method, req.url);
    next();
});

// 'public' path is the static director
app.use(express.static(path.join(__dirname, 'public')));

app.use('/node-modules', express.static(__dirname + '/node_modules'));

app.use('/fonts', express.static(__dirname + '/fonts'));

app.use(bodyParser.urlencoded( {extended : false} ));

app.use('/api', routes);

var server = app.listen(app.get('port'), function(){
    var port = server.address().port;
    console.log('Running on port: ' + port);
});





/* useful methods for get and post api

app.get('/json', function(req, res){
    console.log("Get the json");
    res.status(200).json({"jsonData" : true})
});

app.get('/file', function(req, res){
    console.log("Get the file");
    res.status(200).sendFile(path.join(__dirname, 'app.js'))
});

*/