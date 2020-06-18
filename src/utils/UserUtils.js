const User = require('../database/connection');

module.exports = {


    validUser(user){
        const { name, email, hasntpass } = user;

        const validName = typeof name == 'string' &&
                            name.trim() != '';

        const validEmail = typeof email == 'string' &&
                            email.trim() != '';

        const validPassword = typeof hasntpass == 'string' &&
                            hasntpass.trim() != '' &&
                            hasntpass.trim().length >= 6;

        return (validName && validEmail && validPassword);
    },
};