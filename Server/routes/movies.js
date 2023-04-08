const express = require('express')
const moviesWS = require('../BLs/moviesBL')
const subsWS = require('../BLs/subsBL')

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
        //res.status(200).send(decoded);
        let movies = await moviesWS.getAllMovies()
       
        return resp.json(movies);
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
        
        let movie = await moviesWS.getMovieByID(req.params.id)
        return resp.json(movie);
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
        
        let ans = await moviesWS.addMovie(req.body.movie)
        return resp.json(ans);
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
        
        let ans = await moviesWS.removeMovie(req.body.movieID)
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
        
        let ans = await moviesWS.updateMovie(req.body.id, req.body.movie);
        return resp.json(ans);
    });

})

module.exports = router;