const mongoose = require('../configs/SubsDB');
var Schema = mongoose.Schema;

let subsPerMovieSchema = new mongoose.Schema({
    movieID: String, 
    members: [Schema.Types.Mixed]
});

module.exports = mongoose.model('subspermovies',subsPerMovieSchema);

