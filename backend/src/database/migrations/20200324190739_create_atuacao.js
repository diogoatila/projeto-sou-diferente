
exports.up = function(knex) {
   return knex.schema.createTable('atuacao' , function (table) {
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
       
        table.string('profissional_id').notNullable();

        table.foreign('profissional_id').references('id').inTable('profissionais');
        
    });
  };
  

exports.down = function(knex) {
  return knex.schema.droptable('atuacao')
};
