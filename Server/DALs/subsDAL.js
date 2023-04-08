const SubModel = require('../models/subsModel')
const db = require('../configs/SubsDB')
const axios = require('axios')


exports.getAllSubs = function()
{
    return new Promise((resolve, reject) => 
        {
            SubModel.find({} , function(err, members)
            {
                if(err) {
                    reject(err)
                }
                else {
                    if (members.length === 0)
                        reject('collection empty')
                    else 
                        resolve(members)
                }
            })
        })
}


exports.getAllMoviesOfMember = function(memberID)
{
    return new Promise((resolve, reject) => 
        {
            SubModel.findOne({memberID: memberID} , function(err, member)
            {
                if(err) {
                    reject(err)
                }
                else {
                    if (member === null)
                        reject('memberId not found')
                    else  {
                        resolve(member.movies)
                    }
                        
                }
            })
        })
}


exports.addSub = function(memberID, movies)
{
    return new Promise((resolve, reject) => 
        {
            const m = new SubModel({
                memberID: memberID,
                movies: movies
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



exports.updateSub = function(memberID, movies)
{
    return new Promise((resolve, reject) => 
        {
            SubModel.findOneAndUpdate({memberID : memberID} , {memberID: memberID, movies: movies}, function(err, subs) {
                if(err) {
                    reject(err)
                }
                else {
                    resolve('Updated')     
                }
            })
        })
}


exports.removeSub = function(memberID)
{
    return new Promise((resolve, reject) => 
        {
            SubModel.findOneAndRemove({memberID : memberID} ,  function(err, subs) {
                if(err) {
                    reject(err)
                }
                else {
                    resolve('Removed')     
                }
            })
        })
}




