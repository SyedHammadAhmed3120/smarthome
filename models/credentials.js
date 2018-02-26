const Joi = require('joi');

const postCredentials = {
    body: {       
        // Id of the user.
        _id: Joi.string().regex(/^[A-z0-9@._-]+$/).min(3).max(50).required(),

        // Password of the user.
        password: Joi.string().min(8).max(50).required()
    }
}

module.exports = {
    postCredentialsSchema: postCredentials
}