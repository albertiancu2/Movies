const membersDAL = require('../DALs/membersDAL')
const initializedDAL = require('../DALs/initializedDAL')
const subsBL = require('./subsBL')

const mongoose = require('mongoose');
const membersModel = require('../models/membersModel');

exports.getAllMembers = async function()
{
    try {
        let isInitialized = await initializedDAL.isInitialized("members")
        if (isInitialized === true) {
            let allMembers = await membersDAL.getAllMembers();
            return allMembers
        }
        else {
            try {
                await membersDAL.initializeDB();
                try {
                    allMembers = await membersDAL.getAllMembers()
                    return allMembers
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

exports.getMemberByID = async function(id)
{
    try {
        let member = await membersDAL.getMemberByID(id);
        return member
    }
    catch (err) {
        console.log(err)
        return err
    }
}


exports.addMember = async function(member)
{
    try {
        let ans = await membersDAL.addMember(member);
        return ans
    }
    catch (err) {
        console.log(err)
        return err
    }
}


exports.updateMember = async function(id, member)
{
    try {
        let ans = await membersDAL.updateMember(id, member);
        return ans
    }
    catch (err) {
        console.log(err)
        return err
    }
}


exports.removeMember = async function(id)
{
    try {
        let ans = await membersDAL.removeMember(id);

        ans = await subsBL.removeMemberFromAllMovies(id);
        
        return ans
    }
    catch (err) {
        console.log(err)
        return err
    }
}



