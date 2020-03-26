const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;

        const [count] = await connection('atuacao').count();
        console.log(count);

    const atuacao = await connection('atuacao')
    .join('profissionais', 'profissionais.id', '=', 'atuacao.profissional_id')
    .limit(5)
    .offset((page - 1) * 5)
    .select(['atuacao.*', 'profissionais.name', 
    'profissionais.email', 
    'profissionais.whatsapp', 
    'profissionais.city', 
    'profissionais.uf'
]);

    response.header('X-Total-Count', count['count(*)']);
        
        return response.json(atuacao);
    },

    async create(request, response){
        const {title, description, value} = request.body;
        const profissional_id = request.headers.authorization;

        const [id] = await connection('atuacao').insert({
            title,
            description,
            value,
            profissional_id,
        });

        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
        const profissional_id = request.headers.authorization;

        const caso = await connection('atuacao')
        .where('id' , id)
        .select('profissional_id')
        .first();

        if (caso.profissional_id != profissional_id) {
            return response.status(401).json({error: 'Operação não permitida.'})
        }

        await connection('atuacao').where('id' , id).delete();
        return response.status(204).send();
    }
};