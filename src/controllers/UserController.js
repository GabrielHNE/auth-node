//import the db connection
const Usknexer = require('../database/connection');
const bcrypt = require('bcryptjs');
const UserUtils = require('../utils/UserUtils');
const jwt = require("jsonwebtoken");
const path = require('path');
const Usuario = require('../models/UsuarioModel');

// module.exports = {
//     async getOneByEmail(email){
//         return await User('users').where('email', email).first();
//     },

//     async index(req, res, next){
//         const { email, password } = req.body;

//         console.log(`Tentando login com: ${email} ${password}`);

//         //checking in the database
//         const user = await User('users')
//         .select('password')
//         .where('email', email)
//         .first();

//         //if user is null or undefined -> error
//         if(!user){
//             return res.status(400).send({ error: "User not found"});
//         }

//         // compare both password to see if it match
//         if( !await bcrypt.compare(password, user.password) ){
//             //return res.status(400).send({ error: "Invalid Password"});
//             const err = new Error("Wrong credentials");
//             err.status = 401 ;
//             next(err);
//         }

//         //if all occurs well, log the user
//         const logUser = await User('users')
//         .select('name', 'email')
//         .where('email', email)
//         .first();

//         const token = jwt.sign(
//             { user: 'adm' },
//             "secret", {
//             expiresIn: 86400
//         });
        
//         return res
//             .status(200)
//             .send({ token, logUser, redirect: 'http://localhost:3000' });
//     },

//     async create(req, res, next){      
//         //validate the user constraints
//         const { name, email } = req.body; 
//         const hasntpass = req.body.password;

//         User('users').where('email', email).first()
//             .then(user => {
//                 //valid the user fields 
                
//                 if(user){
//                     throw new Error('Email already exists!');
//                 }
                
//                 if(!UserUtils.validUser({ name, email, hasntpass })){
//                     throw new Error('Invalid Fields!');
//                 }
//                 return bcrypt.hash(hasntpass, 10);
//             })
//             .then(async (password) => {
//                 try{
//                     await User('users').insert({
//                         name,
//                         email,
//                         password
//                     });

//                     console.log("User created");
//                 } catch(err){
//                     throw err;
//                 }
                                
//             })
//             .then(()=> res.status(200).send('ok'))
//             .catch(err => {
//                 next({err: err.message, status: 409});
//             });
//     },

//     async update(req, res, next){
//         //update users
//     },

//     async delete(req, res, next){
//         //soft delete users
//     },

//     //methods
//     // generateToken() {
//     //     return jwt.sign({ id: this.id }, "secret", {
//     //       expiresIn: 86400
//     //     });
//     // }
// };

module.exports = {
    async index(req, res){
        const { id } = req.params;

        try{
            const usuario = Usuario.getById(id);

            if(!usuario) return res.status(404).send("User not found!");

            return res.status(200).send(usuario);

        }catch(e){
            console.log("[On index]\n" + e);
            return res.status(500).send("Internal server error");
        }
    },

    async show(req, res){
        try{
            const users = await Usuario.listUsers();

            if(!users || users.length == 0) return res.status(404).send("Users not found!");

            return res.status(200).send(users); //returns an array with users
        } catch( e ){
            console.log("[On show]\n" + e);
            return res.status(500).send("Internal server error");
        }
    },

    async create(req, res){
        const {name, email, password} = req.params;
        
        try{
            const usuario = Usuario.getByEmail(email);

            if(usuario) return res.status(409).send("User already exists!");

            const newUser = new Usuario({name, email});
            newUser.addPassword(password);

            await newUser.create();

            const createdUser = Usuario.getByEmail(newUser.email);

            return res.status(201).send(createdUser);

        }catch(e){
            console.log("[On created]\n" + e);
            return res.status(500).send("Internal server error");
        }
    },

    async update(req, res){
        //fazer dps -> criar no model
    },

    async delete(req, res){

        const { id } = req.params;

        try{
            const usuario = await Usuario.getById(id);

            if(!usuario) return res.status(404).send("User not found!");

            await usuario.delete();

            return res.status(200).send();
        }catch(e){
            console.log("[On delete]\n" + e);
            return res.status(500).send("Internal server error");
        }
    }


}