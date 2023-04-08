var express = require('express');
var cors = require('cors')
var session = require('express-session')

var app = express();

app.use(cors())

const bodyParser = require('body-parser');

require('./configs/SubsDB');


// configure the body-parser
// to accept urlencoded bodies
// and json data


app.use (
   session ({
      secret: "my-secret",
      saveUninitialized: false,
      resave: true,
      rolling: true,
      cookie: {
         maxAge: 1*60*60*1000,
         credentials: true
      }
   })
);

 
app.use(bodyParser.urlencoded({ extended: true }))  
   .use(bodyParser.json());

app.use('/membersWS', require('./routes/members')); 
app.use('/moviesWS', require('./routes/movies')); 
app.use('/subsWS', require('./routes/subs'));
app.use('/usersWS', require('./routes/users')); 


app.listen(8000);