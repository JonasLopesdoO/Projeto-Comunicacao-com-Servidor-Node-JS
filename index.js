
//pasta com as funções e o export
//pasta só com as rotas

const express = require('express');
const request = require('request')
let bodyParser = require('body-parser')
var app = express();

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
app.get('/listar', function (req, res) {
    request('https://f5zg6v0z92.execute-api.us-east-1.amazonaws.com/dev/contacts', function (error, response, body) {

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.

        res.render("list_page.html", {
            contato: JSON.parse(body)
        })
    });
});


//funções de cadastrar
app.get('/cadastrar', function (req, res) {
    res.render("register_page.html", {
    })
});

app.post('/cadastrarContato', function (req, res) {
    var nome = req.body.name;
    var email = req.body.email;
    var genero = req.body.gender;
    var telefone = req.body.phone

    var postData = {
        "name": nome,
        "email": email,
        "gender": genero,
        "telefone": telefone
    }

    request.post({
        url: "https://f5zg6v0z92.execute-api.us-east-1.amazonaws.com/dev/contacts",
        method: "POST",
        json: postData,
    },
        function (error, response, body) {
            console.log(body);
            console.log(res.statusCode);
            res.redirect("listar")
        });
});




//métodos para buscar contato
app.get('/buscar', function (req, res) {
    res.render("search_page.html", {
    })
});

app.get('/buscarContato/', function (req, res) {
    var idBusca = req.query.idBusca
    console.log("ID: " + idBusca)

    request.get('https://f5zg6v0z92.execute-api.us-east-1.amazonaws.com/dev/contacts/' + idBusca, function (error, response, body) {
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.

        res.render("show_contact.html", {
            contatoBuscado: JSON.parse(body)
        })
    });
});





//método para deletar contato
app.post('/deletarContato', function (req, res) {
    var idDeletar = req.body.idDeletar

    console.log("ID Aqui: ", idDeletar)

    request.delete({
        url: "https://f5zg6v0z92.execute-api.us-east-1.amazonaws.com/dev/contacts/" + idDeletar,
        method: "DELETE",
    },
        function (error, response, body) {
            console.log(body);
            console.log(res.statusCode);
            res.redirect("/listar")
        });
});






//Métodos para atualização de contato
app.post('/atualizarContato', function (req, res) {
    var idAtualizar = req.body.idAtualizar

    console.log("ID Aqui: ", idAtualizar)

    request.get('https://f5zg6v0z92.execute-api.us-east-1.amazonaws.com/dev/contacts/' + idAtualizar, function (error, response, body) {
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.

        res.render("update_page.html", {
            contatoAtualizar: JSON.parse(body)
        })
    });
});

app.post('/atualizarContatoFinal', function (req, res) {
    //pega os dados do formulário de atualização
    var id = req.body.idContatoAtualizar;
    var nome = req.body.name;
    var email = req.body.email;
    var genero = req.body.gender;
    var telefone = req.body.phone

    var postData = {
        "name": nome,
        "email": email,
        "gender": genero,
        "telefone": telefone
    }

    //chama o put para atualizar
    request.put({
        url: "https://f5zg6v0z92.execute-api.us-east-1.amazonaws.com/dev/contacts/" + id,
        method: "PUT",
        json: postData,
    },
        function (error, response, body) {
            console.log(body);
            console.log(res.statusCode);
            res.redirect("listar")
        });
});

app.listen(3060, function () {
    console.log('Está rodando na porta 3060!');
});


