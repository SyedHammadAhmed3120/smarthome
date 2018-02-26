const Joi = require('joi');

const user = {
    body: {      
        // Id of the user.
        _id: Joi.string().regex(/^[A-z0-9@._-]+$/).min(3).max(50).required(),

        // Password of the user.
        password: Joi.string().min(8).max(50).required(),

        // Firstname of the user.
        firstname: Joi.string().regex(/^[A-z]+$/).optional(),

        // Lastname of the user.
        lastname: Joi.string().regex(/^[A-z]+$/).optional(),

        // Email of the user. Must follow the proper email format.
        email: Joi.string().email().optional()
    }
}

module.exports = user;