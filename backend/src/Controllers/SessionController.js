const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { id } = request.body;

        const prof = await connection('profissionais')
        .where('id' , id)
        .select('name')
        .first();

        if (!prof){
            return response.status(400).json({ error: 'Não foi encontrado um profissional com este ID.'})
        }
        return response.json(prof);
    }
}