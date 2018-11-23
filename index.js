
const port = 3060;

const express = require('express');
const request = require('request');
let bodyParser = require('body-parser');
var app = express();

const meuController = require("./controllers/actions")

//permitir o render para páginas html
//app.use(express.static(__dirname + '/app'));
app.use(express.static('public'));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//enviar dados com ejs para o html
app.engine('html', require('ejs').renderFile);
//aceitando javascript na página html
app.engine('javascript', require('ejs').renderFile);





//método para listar contatos
app.get('/listar', meuController.listar);

//funções de cadastrar
app.get('/cadastrar', meuController.cadastrar);

//função para cadastrar o contato preenchido na tela de cadastro
app.post('/cadastrarContato', meuController.cadastrarContato);

//métodos para buscar página de contato
app.get('/buscar', meuController.buscar);

//chamada de função para buscar um contato pelo ID
app.get('/buscarContato/', meuController.buscarContato);

//chamada de função para deletar contato
app.post('/deletarContato', meuController.deletarContato);

//Chamada de função para a página de atualização de contato
app.post('/atualizarContato', meuController.atualizarContato);

//Chamada de função para atualização de contato em si
app.post('/atualizarContatoFinal', meuController.atualizarContatoFinal);

//chamada para função que deleta todos os contatos
app.get('/deletarTodosContatos', meuController.deletarTodos);

app.listen(port, function () {
    console.log(`Executando na porta ${port}`);
});


