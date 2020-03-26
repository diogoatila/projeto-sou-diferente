const express = require('express');
const ProfissionaisController = require('./Controllers/ProfissionaisController');
const AtuacaoController = require('./Controllers/AtuacaoController');
const ProfileController = require('./Controllers/ProfileController');
const SessionController = require('./Controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/profissionais', ProfissionaisController.index);
routes.post('/profissionais', ProfissionaisController.create);

routes.get('/profile' , ProfileController.index)

routes.get('/atuacao' , AtuacaoController.index);
routes.post('/atuacao' , AtuacaoController.create);
routes.delete('/atuacao/:id' , AtuacaoController.delete);
module.exports = routes;