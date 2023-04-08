const mongoose = require('../configs/SubsDB');

let initSchema = new mongoose.Schema({
    name: String,
    initialized: Boolean
});

module.exports = mongoose.model('initialized',initSchema);

