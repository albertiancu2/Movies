const express = require('express')
const usersWS = require('../BLs/usersBL')
const jwt = require('jsonwebtoken');

const secretKey = "someKey" //NEED TO BE IN A PROTECTED FILE!!!!


const router = express.Router();

router.route('/').get(async function(req,resp)
{
    let users = await usersWS.getAllUsers()
    return resp.json(users);
})


router.route('/islogged').get(async function(req,resp)
{
    if (req.session.loggedin === true) {
       return resp.json(req.session.currentUser) 
    }
    else 
        return resp.json('')
})



router.route('/data/:id').get(async function(req,resp)
{
    let data = await usersWS.getUserDataByID(req.params.id)
    return resp.json(data);
})


router.route('/perms/:id').get(async function(req,resp)
{
    let perm = await usersWS.getUserPermissionsByID(req.params.id)
    return resp.json(perm);
})


router.route('/login').post(async function(req,resp)
{
    
    let resMsg = await usersWS.checkLoginCredentials(req.body.username, req.body.password)
    
    if (resMsg.state === 'OK') {
        req.session.loggedin = true;
        req.session.currentUser = req.body.username;
        
        var data = await usersWS.getUserDataByID(resMsg.userId)

        if (data.SessionTimeOut !== undefined) {
            var token = jwt.sign( {id: resMsg.userId}, secretKey, {expiresIn: Number(data.SessionTimeOut)}) //TODO: change expires in to session timeout
            return resp.json({...resMsg, token: token});
        }
        else {
            var token = jwt.sign( {id: resMsg.userId}, secretKey) //TODO: change expires in to session timeout
            return resp.json({...resMsg, token: token});
        }

        
    }
    
    else {
        return resp.json(resMsg);
    }
    
    
    
})


router.route('/signup').post(async function(req,resp)
{
    let resMsg = await usersWS.newUserPassword(req.body.username, req.body.password)
    
    var token = jwt.sign( {id: resMsg.userId}, secretKey, {expiresIn: 10}) //TODO: change expires in to session timeout

    return resp.json({...resMsg, token: token});
   
})


router.route('/add').post(async function(req,resp)
{
    let resMsg = await usersWS.addNewUser(req.body.username, req.body.data, req.body.permissions)
    return resp.json(resMsg);
    
})


router.route('/edit/:id').post(async function(req,resp)
{
    let resMsg = await usersWS.updateUser(req.params.id, req.body.data, req.body.permissions)
    return resp.json(resMsg);
    
})


router.route('/remove/:id').post(async function(req,resp)
{
    let resMsg = await usersWS.removeUser(req.params.id)
    return resp.json(resMsg);
    
})



module.exports = router;