const mongoose = require('../configs/SubsDB');

let memberSchema = new mongoose.Schema({
    name: String,
    email: String,
    city: String
});

module.exports = mongoose.model('members',memberSchema);

