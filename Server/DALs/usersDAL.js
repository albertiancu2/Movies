const UserModel = require('../models/usersModel')
const db = require('../configs/UsersDB')
const axios = require('axios')


exports.getAllUsers = function()
{
    return new Promise((resolve, reject) => 
        {
            UserModel.find({} , function(err, users)
            {
                if(err) {
                    reject(err)
                }
                else {
                    resolve(users)
                }
            })
        })
}


exports.getUserByID = function(id)
{
    return new Promise((resolve, reject) => 
        {
            UserModel.findById(id , function(err, user)
            {
                if(err) {
                    reject(err)
                }
                else {
                    if (user === null)
                        reject('no member with give ID')
                    else 
                        resolve(user)
                }
            })
        })
}


exports.getUserByUsername = function(username)
{
    return new Promise((resolve, reject) => 
        {
            UserModel.find({username: username} , function(err, users)
            {
                if(err) {
                    reject(err)
                }
                else {
                    if (users.length === 0) {
                        reject("username not in DB")
                    }
                    resolve(users[0])
                }
            })
        })
}


exports.addUser = function(user)
{
    return new Promise((resolve, reject) => 
        {
            const m = new UserModel({
                username: user.username,
                password: user.password
            });

           m.save(function(err, usr) {
               if(err) {
                   reject(err)
               }
               else {
                   resolve(usr.id)
               }
           })
        })
}


exports.updateUser = function(id, user)
{
    return new Promise((resolve, reject) => 
        {
            UserModel.findByIdAndUpdate(id, user,  function(err, updatedUser)
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




exports.removeUser = function(id)
{
    return new Promise((resolve, reject) => 
        {
            UserModel.findByIdAndDelete(id , function(err, users)
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


