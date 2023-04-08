const usersDAL = require('../DALs/usersDAL')
const userJSON = require('../DALs/usersJSONDAL')
const permissionsDAL = require('../DALs/permissionsJSONDAL')

const mongoose = require('mongoose');
const UsersModel = require('../models/usersModel');
const { use } = require('../routes/users');


exports.getAllUsers = async function()
{
    try {  
        allUsers = await userJSON.getAllUsers()
        return allUsers
    }
     
    catch (err) {
        console.log(err)
    }

}


exports.getUserDataByID = async function(id)
{
    try {
        let user = await userJSON.getUserByID(id);
        return user
    }
    catch (err) {
        console.log(err)
        return err
    }
}


exports.getUserPermissionsByID = async function(id)
{
    try {
        let user = await permissionsDAL.getUserPermissionsByID(id);
        return user
    }
    catch (err) {
        console.log(err)
    }
}



exports.addNewUser = async function(username, data, permissions)
{
    try {
        let currUser = await usersDAL.getUserByUsername(username);
        return "username already exists"
    }
    catch (err) {
        if (err === "username not in DB") {
            try {
                let userId = await usersDAL.addUser({username: username, password: ''})
                await userJSON.addUser({...data, id: userId})
                await permissionsDAL.addUserPemissions({permissions: permissions, id: userId})
                return "OK"
            }
            catch (err) {
                return err
            }
            
            
        }
        else {
            return err
        }
    }
}



exports.newUserPassword = async function(username, password)
{
    try {
        let user = await usersDAL.getUserByUsername(username)
        if (user.password !== '') {
            return {state: "error", msg: "You are already signed up!"}
        }
        else {
            await usersDAL.updateUser(user._id, {username: username, password: password})
            return {state: "OK", userId: user.id}
        }
    }
    catch (err) {
        return {state: "error", msg: err}
    }     
}



exports.updateUser = async function(id, userData, permissions)
{
    try {
        let ans = await userJSON.updateUser({id: id, ...userData});
        await permissionsDAL.updateUserPermissions(id, permissions)
        return ans
    }
    catch (err) {
        console.log(err)
    }
}


exports.updateUserPermissions = async function(id, permissions)
{
    try {
        let ans = await permissionsDAL.updateUserPermissions({id: id, permissions: permissions});
        return ans
    }
    catch (err) {
        console.log(err)
    }
}




exports.removeUser = async function(id)
{
    try {
        let ans = await usersDAL.removeUser(id);
        await userJSON.removeUser(id);
        await permissionsDAL.removeUserPermissions(id);
        return "Deleted"
    }
    catch (err) {
        return err
    }
}


exports.checkLoginCredentials = async function(username, password)
{
    try {
        let usr = await usersDAL.getUserByUsername(username)
        if (usr.password === '') {
            return {state: "error", msg: "You need to sign up fist!!!"}
        }
        else if (usr.password !== password) {
            return {state: "error", msg: "Incorrect Password"}
        }
        else {
            return {state: "OK", userId: usr.id}
        }
    }
    catch (err) {
        return {state: "error", msg: err}
    } 
}



// this.checkLoginCredentials('bbb', 'ewqqew').then(ans => console.log(ans))