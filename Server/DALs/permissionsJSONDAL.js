var path = require('path')

const jfile = require('jsonfile')

const filePath = path.join(__dirname, '..', 'jsons', 'Permissions.json')


exports.getAllUsersPermissions = function()
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
                resolve(obj['usersPermissions']);
        })
    })
}


exports.getUserPermissionsByID = function (id)
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
                let allUsers = obj['usersPermissions']
                let user = allUsers.find( u => u.id === id)
                
                if (user === undefined) {
                    reject('user not found')
                }
                else {
                    resolve(user.permissions);
                }
                
                
            }
                
        })
    })
}


exports.addUserPemissions = function(user)
{
    return new Promise(async (resolve,reject) => {

        let getAllUsersPermissions = await this.getAllUsersPermissions()
        getAllUsersPermissions.push(user)

        jfile.writeFile(filePath, {'usersPermissions' : getAllUsersPermissions}, function(err) {
            if (err)
                reject(err);
            else
                resolve("OK")
        })
    })

}


exports.removeUserPermissions = function(id)
{
    return new Promise(async (resolve,reject) => {

        let allUsersPermissions = await this.getAllUsersPermissions()
        let newUsersPermissions = allUsersPermissions.filter( u => u.id !== id)

        jfile.writeFile(filePath, {'usersPermissions' : newUsersPermissions}, function(err) {
            if (err)
                reject(err);
            else
                resolve("OK")
        })
    })

}



exports.updateUserPermissions = function(id, permissions)
{
    return new Promise(async (resolve,reject) => {

        let allUsersPermissions = await this.getAllUsersPermissions()
        let newUsersPermissions = allUsersPermissions.filter( u => u.id !== id)
        newUsersPermissions.push({id: id, permissions: permissions})

        jfile.writeFile(filePath, {'usersPermissions' : newUsersPermissions}, function(err) {
            if (err)
                reject(err);
            else
                resolve("OK")
        })
    })

}