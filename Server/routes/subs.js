const express = require('express')
const subsWS = require('../BLs/subsBL')
const jwt = require('jsonwebtoken');

const secretKey = "someKey" //NEED TO BE IN A PROTECTED FILE!!!!

const router = express.Router();

router.route('/subs').get(async function(req,resp)
{
    let subs = await subsWS.getAllSubs()
    return resp.json(subs);
})


router.route('/subs/:id').get(async function(req,resp)
{
    let movies = await subsWS.getAllMoviesOfMember(req.params.id)
    return resp.json(movies);
})


router.route('/movieSubs').get(async function(req,resp)
{
    let subs = await subsWS.getAllSubsPerMovie()
    return resp.json(subs);
})


router.route('/movieSubs/:id').get(async function(req,resp)
{
    let subs = await subsWS.getAllMembersOfMovie(req.params.id)
    return resp.json(subs);
})


router.route('/add').post(async function(req,resp)
{
    let ans = await subsWS.addSub(req.body.memberID, req.body.movieID, req.body.date)
    ans = await subsWS.addSubForMovie(req.body.memberID, req.body.movieID, req.body.date)
    return resp.json(ans);
})


router.route('/remove').post(async function(req,resp)
{
    let ans = await subsWS.removeMemberFromMovie(req.body.memberID, req.body.movieID)
    ans = subsWS.removeMovieFromMember(req.body.memberID, req.body.movieID)
    return resp.json(ans);
})

module.exports = router;