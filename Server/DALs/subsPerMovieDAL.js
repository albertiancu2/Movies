const SubPerMovieModel = require('../models/subsPerMovieModel')
const db = require('../configs/SubsDB')
const axios = require('axios')


exports.getAllMovieSubs = function()
{
    return new Promise((resolve, reject) => 
        {
            SubPerMovieModel.find({} , function(err, movies)
            {
                if(err) {
                    reject(err)
                }
                else {
                    if (movies.length === 0)
                        reject('collection empty')
                    else 
                        resolve(movies)
                }
            })
        })
}


exports.getAllMembersOfMovie = function(movieID)
{
    return new Promise((resolve, reject) => 
        {
            SubPerMovieModel.findOne({movieID: movieID} , function(err, movie)
            {
                if(err) {
                    reject(err)
                }
                else {
                    if (movie === null)
                        reject('movieId not found')
                    else  {
                        resolve(movie.members)
                    }
                        
                }
            })
        })
}


exports.addSub = function(movieID, members)
{
    return new Promise((resolve, reject) => 
        {
            const m = new SubPerMovieModel({
                movieID: movieID,
                members: members
            });

           m.save(function(err) {
               if(err) {
                   reject(err)
               }
               else {
                   resolve('Created')
               }
           })
        })
}



exports.updateSub = function(movieID, members)
{
    return new Promise((resolve, reject) => 
        {
            SubPerMovieModel.findOneAndUpdate({movieID : movieID} , {movieID: movieID, members: members}, function(err, subs) {
                if(err) {
                    reject(err)
                }
                else {
                    resolve('Updated')
                }
            })
        })
}



exports.removeSub = function(movieID)
{
    return new Promise((resolve, reject) => 
        {
            SubPerMovieModel.findOneAndRemove({movieID : movieID} ,  function(err, subs) {
                if(err) {
                    reject(err)
                }
                else {
                    resolve('Removed')     
                }
            })
        })
}