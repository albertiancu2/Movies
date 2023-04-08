var path = require('path')

const jfile = require('jsonfile')

const filePath = path.join(__dirname, '..', 'jsons', 'Users.json')


exports.getAllUsers = function()
{
    return new Promise((resolve, reject) => 
    {
        jfile.readFile(filePath, function(err, obj) {
            if (err) {
                if (err.errno == -4058)
                    resolve([]);
                else 
                    reject(err);
            }
            else
                resolve(obj['users']);
        })
    })
}


exports.getUserByID = function (id)
{
    return new Promise((resolve, reject) => 
    {
        jfile.readFile(filePath, function(err, obj) {
            if (err) {
                if (err.errno == -4058)
                    resolve({});
                else 
                    reject(err);
            }
            else {
                let allUsers = obj['users']
                let user = allUsers.find( u => u.id === id)
                
                resolve(user);
            }
                
        })
    })
}


exports.addUser = function(user)
{
    return new Promise(async (resolve,reject) => {

        let allUsers = await this.getAllUsers()
        allUsers.push(user)

        jfile.writeFile(filePath, {'users' : allUsers}, function(err) {
            if (err)
                reject(err);
            else
                resolve("OK")
        })


    })

}


exports.removeUser = function(id)
{
    return new Promise(async (resolve,reject) => {

        let allUsers = await this.getAllUsers()
        let newUsers = allUsers.filter( u => u.id !== id)

        jfile.writeFile(filePath, {'users' : newUsers}, function(err) {
            if (err)
                reject(err);
            else
                resolve("OK")
        })
    })

}



exports.updateUser = function(user)
{
    return new Promise(async (resolve,reject) => {

        let allUsers = await this.getAllUsers()
        let newUsers = allUsers.filter( u => u.id !== user.id)
        newUsers.push(user)

        jfile.writeFile(filePath, {'users' : newUsers}, function(err) {
            if (err)
                reject(err);
            else 
                resolve("OK")
        })
    })

}