'use strict';

let express = require('express');
let mongoose = require('mongoose');
let session = require('express-session');
let mongoStore = require('connect-mongo')(session);
let bodyParser = require('body-parser').json;

// Assign routes to variables to be used by app
let userRoutes = require('./routes/userRoutes');
let authRoutes = require('./routes/authRoutes');
let rentRoutes = require('./routes/rentRoutes');
let entRoutes = require('./routes/entertainmentRoutes');
let diningRoutes = require('./routes/diningRoutes');
let groceryRoutes = require('./routes/groceryRoutes');
let buildingRoutes = require('./routes/buildingRoutes');
let universityRoutes = require('./routes/universityRoutes');

let app = express();

app.use(bodyParser());

mongoose.connect('mongodb://damian:password@ds123371.mlab.com:23371/heroku_6822tlk9');

let db = mongoose.connection;
db.on('error', (error) => {
    console.log('connection error: ', error);
});

// use sessions for tracking logins
app.use(session({
    secret: 'jusbuss and roam free',
    resave: true,
    saveUninitialized: false,
    store: new mongoStore({
        mongooseConnection: db,
    })
}));

db.once('open', () => {
    console.log('database connection was successful');
});

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', rentRoutes);
app.use('/', entRoutes);
app.use('/', diningRoutes);
app.use('/', groceryRoutes);
app.use('/', buildingRoutes);
app.use('/', universityRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    let error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Error Handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
    next();
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Express server is listening on port: ${port}`);
});
