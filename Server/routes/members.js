const express = require('express')
const membersWS = require('../BLs/membersBL')
const jwt = require('jsonwebtoken');

const secretKey = "someKey" //NEED TO BE IN A PROTECTED FILE!!!!

const router = express.Router();

router.route('/').get(async function(req,resp)
{
    var token = req.headers['x-access-token'];
    if (!token)
        return resp.json({ error: 401, message: 'No token provided.' });

    jwt.verify(token, secretKey, async function(err, decoded) 
    {
        if (err) 
            return resp.json({ error: 500, message: 'Failed to authenticate token.' });        
        
        let members = await membersWS.getAllMembers()
        return resp.json(members);
    });

})

router.route('/:id').get(async function(req,resp)
{
    var token = req.headers['x-access-token'];
    if (!token)
        return resp.json({ error: 401, message: 'No token provided.' });

    jwt.verify(token, secretKey, async function(err, decoded) 
    {
        if (err) 
            return resp.json({ error: 500, message: 'Failed to authenticate token.' });        
        
        let member = await membersWS.getMemberByID(req.params.id)
        return resp.json(member);
    });


})

router.route('/add').post(async function(req,resp)
{
    var token = req.headers['x-access-token'];
    if (!token)
        return resp.json({ error: 401, message: 'No token provided.' });

    jwt.verify(token, secretKey, async function(err, decoded) 
    {
        if (err) 
            return resp.json({ error: 500, message: 'Failed to authenticate token.' });        
        
        let member = await membersWS.addMember(req.body.member)
        return resp.json(member);
    });


})

router.route('/remove').post(async function(req,resp)
{
    var token = req.headers['x-access-token'];
    if (!token)
        return resp.json({ error: 401, message: 'No token provided.' });

    jwt.verify(token, secretKey, async function(err, decoded) 
    {
        if (err) 
            return resp.json({ error: 500, message: 'Failed to authenticate token.' });        
        
        let ans = await membersWS.removeMember(req.body.memberID)
        return resp.json(ans);
    });


})


router.route('/update').post(async function(req,resp)
{
    var token = req.headers['x-access-token'];
    if (!token)
        return resp.json({ error: 401, message: 'No token provided.' });

    jwt.verify(token, secretKey, async function(err, decoded) 
    {
        if (err) 
            return resp.json({ error: 500, message: 'Failed to authenticate token.' });        
        
        let ans = await membersWS.updateMember(req.body.id, req.body.member);
        return resp.json(ans);
    });


})



module.exports = router;