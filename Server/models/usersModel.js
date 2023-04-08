const mongoose = require('../configs/UsersDB');
var Schema = mongoose.Schema;

let usersSchema = new mongoose.Schema({
    username: String, 
    password: String,
});

module.exports = mongoose.model('users', usersSchema);

