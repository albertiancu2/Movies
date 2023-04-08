const mongoose = require('mongoose').Mongoose;

let usersDB = new mongoose();
usersDB.connect('mongodb://localhost:27017/UsersDB',  {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
// mongoose.connect('mongodb://localhost:27017/UsersDB',  {useNewUrlParser: true, useUnifiedTopology: true});

const conn = usersDB.connection;
conn.once('open', function() {
    console.log('UsersDB CONNECTED!')
})

module.exports = usersDB;