const MovieModel = require('../models/moviesModel')
const InitializeModel = require('../models/initializeModel')
const db = require('../configs/SubsDB')
const axios = require('axios')


const WSPath = 'https://api.tvmaze.com/shows?page=0'

exports.initializeDB = async function()
{
    let startingMovies = await axios.get(WSPath)
    let startingMoviesData = startingMovies.data.map( m => {
       return  {name: m.name, genres: m.genres, image: m.image.medium, premiered: m.premiered}
    })

    return new Promise((resolve, reject) => {
        MovieModel.insertMany(startingMoviesData)
        .then(ans => {
            const m = new InitializeModel({
                name: "movies",
                initialized: true
            });

           m.save()

            resolve("initialized!!!")
        })
        .catch( err => console.log(err))
    })

}

exports.getAllMovies = function()
{
    return new Promise((resolve, reject) => 
        {
            MovieModel.find({} , function(err, movies)
            {
                if(err) {
                    reject(err)
                }
                else {
                    resolve(movies)
                }
            })
        })
}


exports.getMovieByID = function(id)
{
    return new Promise((resolve, reject) => 
        {
            MovieModel.findById(id , function(err, movie)
            {
                if(err) {
                    reject(err)
                }
                else {
                    if (movie === null)
                        reject('no member with give ID')
                    else 
                        resolve(movie)
                }
            })
        })
}


exports.addMovie = function(movie)
{
    return new Promise((resolve, reject) => 
        {
            const m = new MovieModel({
                name: movie.name, 
                genres: movie.genres, 
                image: movie.image.small,
                premiered: movie.premiered
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


exports.updateMovie = function(id, movie)
{
    return new Promise((resolve, reject) => 
        {
            MovieModel.findByIdAndUpdate(id, movie,  function(err, updatedMovie)
            {
                if(err) {
                    reject(err)
                }
                else {
                    resolve("Updated")
                }
            })
        })
}



exports.removeMovie = function(id)
{
    return new Promise((resolve, reject) => 
        {
            MovieModel.findByIdAndDelete(id , function(err, movies)
            {
                if(err) {
                    reject(err)
                }
                else {
                    resolve("Deleted")
                }
            })
        })
}


