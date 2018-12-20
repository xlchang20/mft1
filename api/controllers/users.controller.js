var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//var regist = require('../../public/angular-app/register/register.controller.js')




// This method has a require router in routes/index.js
module.exports.register = function(req, res){
    console.log('---------------- Registering Users. ---------------- ');

    app.post('/', function(req, res){
        var usernameId = req.body.usernameId;
        var username = req.body.username;
        console.log(usernameId + " --------------------------------------")
        console.log(username + " --------------------------------------")
    })

    var usernameId = req.body.usernameId;
    var username = req.body.username;
    var name = req.body.name || null;
    var password = req.body.password;

    console.log(usernameId + " *******************************")
    console.log(username + " *******************************")
/*
    const {username, name, password} = req.body;

    const usrzzz = new User({
        username,
        name,
        password
    })

    console.log(usrzzz.username + " ******************************* line 22")
*/




    User.create({
        username: username,
        name: name,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        date: Date()
    }, function(err, user){
        if(err){
            console.log(err)
            res.status(400).json(err);
        } else {
            console.log('User created', user);
            res.status(201).json(user);
        }
    });
};









// This method has a require router in routes/index.js
module.exports.login = function(req, res){
    console.log('Logging in user');
    var username = req.body.username;
    var password = req.body.password;

    console.log(username+" *************")

    User.findOne({
        username: username
    }).exec(function(err, user){
        if(err){
            console.log(err);
            res.status(400).json(err);
        } else {
            if(bcrypt.compareSync(password, user.password)){
                console.log('User found', user);
                var token = jwt.sign({ username: user.username }, 'secret', { expiresIn: 3600 });
                res.status(200).json({ success: true, token: token });
            } else {
                res.status(401).json("Unauthorize User.")
            }
        }
    })
};


// Middleware
// This method has a require router in routes/index.js
module.exports.authenticate = function(req, res, next){
    var headerExists = req.headers.authorization;
    if(headerExists){
        var token = req.headers.authorization.split(' ')[1]; // --> authorization Bearer xxx
        jwt.verify(token, 'secret', function(error, decoded){
            if(error){
                console.log(error);
                res.status(401).json('Unauthorized User.');
            } else {
                req.user = decoded.username;
                next();
            }
        });
    } else {
        res.status(403).json('No token provided.');
    } 
};
