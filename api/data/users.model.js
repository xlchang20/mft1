var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    name: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    date:{type: Date}
});


const User = mongoose.model('User', userSchema)
module.exports = User;