const Joi = require('joi');

const getUser = {
    query: {
        // Firstname of the user.
        firstname: Joi.string().regex(/^[A-z]+$/).optional(),

        // Lastname of the user.
        lastname: Joi.string().regex(/^[A-z]+$/).optional(),
        
        // Registration date of the user.
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

const postUser = {
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

const putUser = {
    body: {      
        // Password of the user.
        password: Joi.string().min(8).max(50).optional(),

        // Firstname of the user.
        firstname: Joi.string().regex(/^[A-z]+$/).optional(),

        // Lastname of the user.
        lastname: Joi.string().regex(/^[A-z]+$/).optional(),

        // Email of the user. Must follow the proper email format.
        email: Joi.string().email().optional()
    }
}

module.exports = {
    getUserSchema: getUser,
    postUserSchema: postUser,
    putUserSchema: putUser
}