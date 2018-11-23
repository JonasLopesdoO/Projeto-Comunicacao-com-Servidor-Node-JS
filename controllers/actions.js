const request = require('request');

//action que chama a listagem da página
var listar = (req, res, next) => {
    request('https://f5zg6v0z92.execute-api.us-east-1.amazonaws.com/dev/contacts', function (error, response, body) {
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.

        res.render("list_page.html", {
            contato: JSON.parse(body)
        })
    });
};

//action que chama a página de cadastro
var cadastrar = (req, res, next) => {
    res.render("register_page.html", {
    })

};

//Essa função recebe o contato da tela de cadastro e cadastra-o
var cadastrarContato = (req, res, next) => {
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
}

//Função que retorna a página de buscar
var buscar = (req, res, next) => {
    res.render("search_page.html", {
    })
};

//Função que busca um contato e retorn a página com o contato exibido
var buscarContato = (req, res, next) => {
    var idBusca = req.query.idBusca
    console.log("ID: " + idBusca)

    request.get('https://f5zg6v0z92.execute-api.us-east-1.amazonaws.com/dev/contacts/' + idBusca, function (error, response, body) {
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.

        res.render("show_contact.html", {
            contatoBuscado: JSON.parse(body)
        })
    });
};

//Função que deleta um contato através do id passado pelio hidden no html
var deletarContato = (req, res, next) => {
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
};


//Assim como na função acima, pega o id pelo hidden, busca o contato e envia os dados para a página de atualização
var atualizarContato = (req, res, next) => {
    var idAtualizar = req.body.idAtualizar

    console.log("ID Aqui: ", idAtualizar)

    request.get('https://f5zg6v0z92.execute-api.us-east-1.amazonaws.com/dev/contacts/' + idAtualizar,
        function (error, response, body) {
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.

            res.render("update_page.html", {
                contatoAtualizar: JSON.parse(body)
            })
        });
};

//Na página de atualização ele salva o contato com as alterações neste método
var atualizarContatoFinal = (req, res, next) => {
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
};

//Deleta todos os contatos, caso o usuário queira zerar a agenda
var deletarTodos = (req, res, next) => {

    request('https://f5zg6v0z92.execute-api.us-east-1.amazonaws.com/dev/contacts', function (error, response, body) {
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.

        var contatos = JSON.parse(body);

        for (i = 0; i < contatos.length; i++) {
            console.log("Aquiiiii: ", contatos[i]._id)
            var idDeletar = contatos[i]._id

            request.delete({
                url: "https://f5zg6v0z92.execute-api.us-east-1.amazonaws.com/dev/contacts/" + idDeletar,
                method: "DELETE",
            },
            function (error, response, body) {
                console.log(body);
                console.log(res.statusCode);
            });
        }

    });
};

module.exports = {
    //páginas principais
    listar, cadastrar, buscar,
    //demais funções
    cadastrarContato, buscarContato, deletarContato, atualizarContato, atualizarContatoFinal,

    deletarTodos
}