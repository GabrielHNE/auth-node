const knex = require('../database/connection');
const bcrypt = require('bcrypt');

class Usuario {
    
    constructor(usuario){
        this.id = usuario.id;
        this.name = usuario.name;
        this.email  = usuario.email;
        this.hash = usuario.hash;

        //validUserValues();
    }

    async addUser(){
        if(! await Usuario.getByEmail(this.email)){
            throw new Error('User already exists');
        }

        try{
            await knex('users').insert({ 
                name: this.name,
                email: this.email,
                password: this.hash
            })
        }catch(e){
            throw new Error(e);
        }
    }

    async addPasswor(password){
        //functions that check if password is correct

        this.hash = await Usuario.generateHash(password);
    }
    
    async delete(){
        return await knex('users').where({ id: this.id }).del();
    }

    static async listUsers(){
        return knex('users').select("*");
    }

    static async getByEmail(email){
        const usuario = await knex('users').where('email', email).first();

        if(!usuario) return null;

        return new Usuario(usuario);
    }

    static async getById(id){
        const usuario = await knex('users').where({id:id}).first();

        if(!usuario) return null;

        return new Usuario(usuario);
    }

    static async generateHash(password){
        return await bcrypt.hash(password, 12);
    }
}