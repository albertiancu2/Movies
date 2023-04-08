const mongoose = require('../configs/SubsDB');
var Schema = mongoose.Schema;

let subsSchema = new mongoose.Schema({
    memberID: String, 
    movies: [Schema.Types.Mixed]
});

module.exports = mongoose.model('subscriptions',subsSchema);

