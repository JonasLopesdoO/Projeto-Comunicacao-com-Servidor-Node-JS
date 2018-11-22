//nome , telefone, email, genero(dropdown list)
//botos como link para q o href faça o submit
//pasta com as funções e o export
//pasta só com as rotas

const express = require('express');
const request = require('request')
let bodyParser = require('body-parser')
var app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var minhaFuncao = require("./funcoes");

app.get('/', function (req, res) {
    
   res.render("home", {
   })
});

app.get('/rota1', function (req, res) {
            request('https://reqres.in/api/users/2', function (error, response, body) {

            if(error == null){
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
                res.send(body);
            }else{
                console.log('error:', error); // Print the error if one occurred
                res.send(error)
            }
        });
});

app.get('/rota2', function (req, res) {
    request('https://reqres.in/api/users/23', function (error, response, body) {

        if(response.statusCode == 404){
            console.log('error:', error); // Print the error if one occurred
            res.send(error)
        }else{
           
        }
    });
});

app.get('/rota3', function (req, res) {
    request('https://reqres.in/api/api/unknown', function (error, response, body) {

    if(error == null){
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        res.send(body);
    }else{
        console.log('error:', error); // Print the error if one occurred
        res.send(error)
    }
});
});


app.post('/rota4', function (req, res) {
    var postData={
        "name": "Jonas",
        "job": "Student"
    }
    
    request.post({
        uri:"https://reqres.in/api/users",
        headers:{'content-type': 'application/x-www-form-urlencoded'},
        body:require('querystring').stringify(postData)
    },
    function(error,response,body){
        console.log(body);
        console.log(res.statusCode);
        res.send(body)
    });
});

app.get('/rota5', function (req, res) {
    request('https://reqres.in/api/users/2', function (error, response, body) {

    if(error == null){
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        res.send(body);
    }else{
        console.log('error:', error); // Print the error if one occurred
        res.send(error)
    }
});
});

app.get('/rota6', function (req, res) {
    request('https://reqres.in/api/register', function (error, response, body) {

    if(error == null){
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        res.send(body);
    }else{
        console.log('error:', error); // Print the error if one occurred
        res.send(error)
    }
});
});


app.get('/rota7', function (req, res) {
    request('https://reqres.in/api/users?delay=3', function (error, response, body) {

    if(error == null){
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        res.send(body);
    }else{
        console.log('error:', error); // Print the error if one occurred
        res.send(error)
    }
});
});

app.get('/rota8', function (req, res) {
    request('https://reqres.in/api/unknown/2', function (error, response, body) {

    if(error == null){
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        res.send(body);
    }else{
        console.log('error:', error); // Print the error if one occurred
        res.send(error)
    }
});
});


app.post('/rotaFinal', function (req, res) {
   
   var nome = req.body.nome;
   var telefone = req.body.telefone

    var postData={
        "nome": nome,
        "telefone": telefone
    }
    
    request.post({
        uri:"https://reqres.in/api/users",
        headers:{'content-type': 'application/x-www-form-urlencoded'},
        body:require('querystring').stringify(postData)
    },
    function(error,response,body){
        console.log(body);
        console.log(res.statusCode);
        res.send(body)
    });
});

app.listen(8000, function () {
  console.log('Está rodando na porta 8000!');
});


