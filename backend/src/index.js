const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes') // "./" é o caminho relativo dos arquivos

const app = express()

mongoose.connect('mongodb+srv://fabio_papais:36562145@cluster0-njnwe.mongodb.net/DevRadar?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(express.json()) // Dizendo que todas as nossas rotas devem entender json

app.use(routes)

// Métodos HTTP get, post, put, delete

//Tipos de parâmetros:

//Query params: São usados principalmente em métodos GET => request.query (Filtros, ordenação, paginação, etc)
//Route params: request.params (Identificar um recurso na alteração ou remoção)
//Body: request.body (Dados par a criação ou alteração de um registro)

// MongoDB (Banco de dados não relacional)


app.listen(3333, function(){}) // Definindo a nossa porta no localhost