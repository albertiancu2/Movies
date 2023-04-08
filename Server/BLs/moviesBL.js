const moviesDAL = require('../DALs/moviesDAL')
const initializedDAL = require('../DALs/initializedDAL')
const subsBL = require('./subsBL')

const mongoose = require('mongoose');
const membersModel = require('../models/membersModel');


exports.getAllMovies = async function()
{
    try {
        let isInitialized = await initializedDAL.isInitialized("movies")

        if (isInitialized === true) {
            let allMovies = await moviesDAL.getAllMovies();
            return allMovies
        }
        else {
            try {
                await moviesDAL.initializeDB();
                try {
                    allMovies = await moviesDAL.getAllMovies()
                    return allMovies
                }
                catch (err2) {
                    console.log(err2)
                }
            }
            catch (err) {
                console.log(err)
                return err
            } 
        }
    }
   
    catch (err) {
        console.log(err)
        return err
    }

}



exports.getMovieByID = async function(id)
{
    try {
        let movie = await moviesDAL.getMovieByID(id);
        return movie
    }
    catch (err) {
        console.log(err)
        return err
    }
}



exports.addMovie = async function(movie)
{
    try {
        let ans = await moviesDAL.addMovie(movie);
        return ans
    }
    catch (err) {
        console.log(err)
        return err
    }
}


exports.updateMovie = async function(id, movie)
{
    try {
        let ans = await moviesDAL.updateMovie(id, movie);
        return ans

        //TODO: update movie in all members (in subs)
    }
    catch (err) {
        console.log(err)
        return err
    }
}


exports.removeMovie = async function(id)
{
    try {
        let ans = await moviesDAL.removeMovie(id);

        ans = await subsBL.removeMovieFromAllMembers(id);
        
        return ans
    }
    catch (err) {
        console.log(err)
        return err
    }
}

