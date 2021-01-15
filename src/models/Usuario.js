const knex = require('../database/connection');

class Usuario {
    
    constructor(usuario){
        this.name = usuario.name;
        this.email  = usuario.email;
        this.hash = usuario.hash;
    }

    async addUser(){
        if(! await Usuario.getByEmail(this.email)){
            throw new Error('User already exists');
        }

        try{
            await knex('users').insert({ 
                name: this.name,
                email: this.email,
                password: this.password
            })
        }catch(e){
            throw new Error(e);
        }
    }

    static async getByEmail(email){
        const usuario = await knex('users').where('email', email).first();

        if(!usuario) return null;

        return new Usuario(usuario);
    }

    static async getById(id){
        const usuario = await knex('users').where('id', id).first();

        if(!usuario) return null;

        return new Usuario(usuario);
    }
}