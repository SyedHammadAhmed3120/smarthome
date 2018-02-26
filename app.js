var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');

// Load environment variables.
dotenv.load();

var app = express();
var port = process.env.PORT;

// Log requests.
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Catch 404 error.
app.use(function(req, res, next) {
    res.status(404).json({
        statusCode: 404,
        message: 'Requested url not found'
    });
});

// Handle errors.
app.use(function(err, req, res, next) {
    if(err.isBoom) {
        // Handle model validation error.
        res.status(err.output.payload.statusCode).json({
            statusCode: err.output.payload.statusCode,
            message: err.output.payload.message
        });
    } else {
        res.status(err.statusCode || 500).json(err);
    }
});

// Start the server.
app.listen(port, function(){
    console.log('App running on port ' + port);
});