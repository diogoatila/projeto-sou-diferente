const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const profissional_id = request.headers.authorization;
        const atuacao = await connection('atuacao')
        .where('profissional_id', profissional_id)
        .select('*');

        return response.json(atuacao);
    }
}