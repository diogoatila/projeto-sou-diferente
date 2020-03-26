const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const profissionais = await connection('profissionais').select('*');
       return response.json(profissionais);
     },
    
    async create(request, response){
        const { name, email, whatsapp, city, uf} = request.body;
    const id = crypto.randomBytes(4).toString('HEX');

    await connection('profissionais').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })
    
    return response.json({ id });
    }
};