const Joi = require('joi');

const organization = {
    body: {
        // Id of the organization.
        _id: Joi.string().regex(/^[A-z0-9_-]+$/).min(3).max(50).required(),

        // Optional description of the organization.
        description: Joi.string().max(100).optional(),

        // Admin of the organization.
        user: Joi.object().keys({
            // Id of the admin.
            _id: Joi.string().regex(/^[A-z0-9@._-]+$/).min(3).max(50).required(),

            // Password of the admin.
            password: Joi.string().min(8).max(50).required(),

            // Firstname of the admin.
            firstname: Joi.string().regex(/^[A-z]+$/).optional(),

            // Lastname of the admin.
            lastname: Joi.string().regex(/^[A-z]+$/).optional(),

            // Email of the admin. Must follow the proper email format.
            email: Joi.string().email().optional()
        }).required()
    }
}

module.exports = organization;