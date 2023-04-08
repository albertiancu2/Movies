const mongoose = require('mongoose').Mongoose;

let subsDB = new mongoose();
subsDB.connect('mongodb://localhost:27017/SubscriptionsDB',  {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
// mongoose.connect('mongodb://localhost:27017/SubscriptionsDB',  {useNewUrlParser: true, useUnifiedTopology: true});

const conn = subsDB.connection;
conn.once('open', function() {
    console.log('SubsDB CONNECTED!')
})

module.exports = subsDB;