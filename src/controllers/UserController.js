//import the db connection
const User = require('../database/connection');
const bcrypt = require('bcryptjs');
const UserUtils = require('../utils/UserUtils');
const { reset } = require('nodemon');

module.exports = {
    async index(req, res, next){

    },
    
    async create(req, res, next){      
        //validate the user constraints
        const { name, email } = req.body; 
        const hasntpass = req.body.password;

        User('users').where('email', email).first()
            .then(user => {
                //valid the user fields 
                
                if(user){
                    throw new Error('Email already exists!');
                }
                
                if(!UserUtils.validUser({ name, email, hasntpass })){
                    throw new Error('Invalid Fields!');
                }
                return bcrypt.hash(hasntpass, 10);
            })
            .then(async (password) => {
                try{
                    await User('users').insert({
                        name,
                        email,
                        password
                    });

                    console.log("User created");
                } catch(err){
                    throw err;
                }
                                
            })
            .then(()=> res.status(200).send('ok'))
            .catch(err => {
                next({err: err.message, status: 409});
            });
    },

    async update(req, res, next){
        //update users
    },

    async delete(req, res, next){
        //soft delete users
    }
};