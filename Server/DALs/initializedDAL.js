const InitializedModes = require('../models/initializeModel')
const db = require('../configs/SubsDB')
const axios = require('axios')

const WSPath = 'https://jsonplaceholder.typicode.com/users'

exports.isInitialized = function(collName)
{
    return new Promise((resolve, reject) => 
        {
            InitializedModes.find({name: collName} , function(err, isInit)
            {
                if(err) {
                    reject(err)
                }
                else {
                    if (isInit.length === 0)
                        resolve(false)
                    else 
                        resolve(true)
                }
            })
        })
}

