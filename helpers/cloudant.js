var Cloudant = require('cloudant');
var dotenv = require('dotenv');

// Load environment variables.
dotenv.load();

// Load VCAP_SERVICES variables.
var vcapServices = { };
if(process.env.NODE_ENV == 'Development') {
    vcapServices = require('../configs/vcap-services');
} else {
    vcapServices = JSON.parse(process.env.VCAP_SERVICES);
}

// Connect Cloudant database.
var cloudant = Cloudant({ vcapServices: vcapServices }, function(err, cloudant) {
    if(err) {
        console.log('Failed to connect Cloudant.');
        console.log(err);
    } else {
        console.log('Connected to Cloudant.');
    }
});

if(!process.env.DATABASE) {
    throw new Error('Database not specified in environment file.');
}

var database = cloudant.db.use(process.env.DATABASE);

module.exports = database;