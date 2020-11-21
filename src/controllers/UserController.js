//import the db connection
const User = require('../database/connection');
const bcrypt = require('bcryptjs');
const UserUtils = require('../utils/UserUtils');

module.exports = {
    async getOneByEmail(email){
        return await User('users').where('email', email).first();
    },

    async index(req, res, next){
        const { email, password } = req.body;

        const user = await User('users')
        .select('password')
        .where('email', email)
        .first();

        if(!user){
            return res.status(400).send({ error: "User not found"});
        }

        if(!await bcrypt.compare(password, user.password)){
            //return res.status(400).send({ error: "Invalid Password"});
            const err = new Error("Wrong credentials");
            err.status = 401 ;
            next(err);
        }

        const logUser = await User('users')
        .select('name', 'email')
        .where('email', email)
        .first();
        
        return res.status(200).send( { logUser });
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