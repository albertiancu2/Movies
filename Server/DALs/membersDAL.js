const MemberModel = require('../models/membersModel')
const InitializeModel = require('../models/initializeModel')
const db = require('../configs/SubsDB')
const axios = require('axios')

const WSPath = 'https://jsonplaceholder.typicode.com/users'

exports.initializeDB = async function()
{
    let startingMembers = await axios.get(WSPath)
    let startingMembersData = startingMembers.data.map( m => {
       return  {name: m.name, email: m.email, city: m.address.city}
    })

    return new Promise((resolve, reject) => {
        MemberModel.insertMany(startingMembersData)
        .then(ans => {
            const m = new InitializeModel({
                name: "members",
                initialized: true
            });

           m.save()

            resolve("initialized!!!")
        })
        .catch( err => console.log(err))
    })


}

exports.getAllMembers = function()
{
    return new Promise((resolve, reject) => 
        {
            MemberModel.find({} , function(err, members)
            {
                if(err) {
                    reject(err)
                }
                else {
                    resolve(members)        
                }
            })
        })
}


exports.getMemberByID = function(id)
{
    return new Promise((resolve, reject) => 
        {
            MemberModel.findById(id , function(err, member)
            {
                if(err) {
                    reject(err)
                }
                else {
                    if (member === null)
                        reject('no member with give ID')
                    else 
                        resolve(member)
                }
            })
        })
}


exports.addMember = function(member)
{
    return new Promise((resolve, reject) => 
        {
            const m = new MemberModel({
                name: member.name,
                email: member.email,
                city: member.city
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



exports.removeMember = function(id)
{
    return new Promise((resolve, reject) => 
        {
            MemberModel.findByIdAndDelete(id , function(err, members)
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



exports.updateMember = function(id, member)
{
    return new Promise((resolve, reject) => 
        {
            MemberModel.findByIdAndUpdate(id, member,  function(err, updatedMember)
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


