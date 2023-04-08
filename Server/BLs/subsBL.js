
const subsDAL = require('../DALs/subsDAL')
const subsPerMovieDAL = require('../DALs/subsPerMovieDAL')

const mongoose = require('mongoose');
const membersModel = require('../models/membersModel');


exports.getAllSubs = async function()
{
    try {
        let allSubs = await subsDAL.getAllSubs();
        return allSubs
    }
    catch (err) {
        if (err === 'collection empty') {
            return []
        }
        else {
            return(err)
        }
    }
}


exports.getAllSubsPerMovie = async function()
{
    try {
        let allSubs = await subsPerMovieDAL.getAllMovieSubs();
        return allSubs
    }
    catch (err) {
        if (err === 'collection empty') {
            return []
        }
        else {
            return(err)
        }
    }
}


exports.getAllMoviesOfMember = async function(id) 
{
    try {
        let allMembersMovies = await subsDAL.getAllMoviesOfMember(id);
        return allMembersMovies
    }
    catch (err) {
        if (err === 'memberId not found') {
            return []
        }
        else {
            return(err)
        }
    }
}


exports.getAllMoviesOfMember = async function(id) 
{
    try {
        let allMoviesOfMember = await subsDAL.getAllMoviesOfMember(id);
        return allMoviesOfMember
    }
    catch (err) {
        if (err === 'memberId not found') {
            return []
        }
        else {
            return(err)
        }
    }
}


exports.getAllMembersOfMovie = async function(id)
{
    try {
        let allMembersOfMovie = await subsPerMovieDAL.getAllMembersOfMovie(id);
        return allMembersOfMovie
    }
    catch (err) {
        if (err === 'movieId not found') {
            return []
        }
        else {
            return(err)
        }
    }
}


exports.addSub = async function(memberID, movieID, date) {
    try {
        let movies = await subsDAL.getAllMoviesOfMember(memberID)
        movies.push({movieId: movieID, date: date})
        await subsDAL.updateSub(memberID, movies)
        return 'OK'
        
    }
    catch(err) {
        if (err === 'memberId not found') {
            await subsDAL.addSub(memberID, [{movieId: movieID, date: date}])
            return 'OK'
        }
        else {
            return err
        }
    }
   
}


exports.addSubForMovie = async function(memberID, movieID, date) 
{
    try {
        let members = await subsPerMovieDAL.getAllMembersOfMovie(movieID)
        members.push({memberId: memberID, date: date})

        await subsPerMovieDAL.updateSub(movieID, members)
        return 'OK'
        
    }
    catch(err) {
        if (err === 'movieId not found') {
            await subsPerMovieDAL.addSub(movieID, [{memberId: memberID, date: date}])
            return 'OK'
        }
        else {
            return err
        }
    }
}



exports.removeMovieFromMember = async function(memberID, movieID)
{
    try {
        let movies = await subsDAL.getAllMoviesOfMember(memberID)
        let newMovies = movies.filter( m => m.movieId !== movieID)

        if (newMovies.length === 0) {
            await subsDAL.removeSub(memberID)
            return 'OK'
        }
        else {
            await subsDAL.updateSub(memberID, newMovies)
            return 'OK'
        }

        
    }
    catch(err) {
        return err
    }
}


exports.removeMemberFromMovie = async function(memberID, movieID)
{
    try {
        let members = await subsPerMovieDAL.getAllMembersOfMovie(movieID)
        let newMembers = members.filter(m => m.memberId !== memberID)


        if (newMembers.length === 0) {
            await subsPerMovieDAL.removeSub(movieID)
            return 'OK'
        }

        await subsPerMovieDAL.updateSub(movieID, newMembers)
        return 'OK'
        
    }
    catch(err) {
        return err
    }
}


exports.removeMovieFromAllMembers = async function(movieID)
{
    try {
        let members = await subsPerMovieDAL.getAllMembersOfMovie(movieID)
        
        members.forEach(async m => {
            await this.removeMovieFromMember(m.memberId, movieID)
        })

        await subsPerMovieDAL.removeSub(movieID)
        return 'OK'
       
    }
    catch(err) {
        return err
    }
        

}




exports.removeMemberFromAllMovies = async function(memberID)
{
    try {
        let movies = await subsDAL.getAllMoviesOfMember(memberID)
        
        movies.forEach(async m => {
            await this.removeMemberFromMovie(memberID, m.movieId)
        })

        await subsDAL.removeSub(memberID)
        return 'OK'
        
    }
    catch(err) {
        return err
    }
}






// subsDAL.getAllMoviesOfMember("556556").then(a => console.log(a))


// let ans = this.addSub("556556", "231321", "25-11-22").then(a => console.log(a))
// ans = this.addSub("603a99a0f83ee32e4059602a", "231321", "01-11-20").then(a => console.log(a))

// let ans = this.addSubForMovie("556556", "231321", "20-12-22").then(a => console.log(a))
// let ans = this.addSubForMovie("2222", "231321", "20-12-22").then(a => console.log(a))

// let ans = this.removeMovieFromMember("1111", "231321").then(a => console.log(a))

// let ans = this.removeMovieFromAllMembers("231321").then(a => console.log(a))

// this.addSub('603a99a0f83ee32e4059602b', '6069e226401eb42e4482423d', '20-03-19')
//     .then(ans => this.addSub('603a99a0f83ee32e4059602b', '6069e226401eb42e44824237', '22-03-19'))

// this.addSubForMovie('603a99a0f83ee32e4059602b', '6069e226401eb42e4482423d', '20-03-19')
//     .then(ans => this.addSubForMovie('603a99a0f83ee32e4059602b', '6069e226401eb42e44824237', '22-03-19'))



// this.getAllMembersOfMovie('6069e226401eb42e4482423d').then(ans => console.log(ans))
// this.getAllMoviesOfMember('603a99a0f83ee32e4059602b').then(ans => console.log(ans))
