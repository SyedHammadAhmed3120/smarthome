const Joi = require('joi');

const getOrganization = {
    query: {      
        // Registration date of the organization.
        created: Joi.string().regex(/^[A-z0-9$:]+$/).optional(),
        
        // Properties of user to be returned.
        fields: Joi.string().optional(),
        
        // Number of records to return.
        limit: Joi.string().optional(),
        
        // Number of records to skip.
        skip: Joi.string().optional(),
        
        // Property used to sort the records.
        sort: Joi.string().optional(),
        
        // Order of the sort property.
        order: Joi.string().optional()
    }
}

const postOrganization = {
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

module.exports = {
    postOrganizationSchema: postOrganization,
    getOrganizationSchema: getOrganization
}