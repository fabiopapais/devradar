const mongoose = require('mongoose')
const PointSchema = require('./utils/PointSchema')

const DevSchema = new mongoose.Schema({ // Estamos criando um esquema de informações que iremos receber
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: { // Essa é a forma de armazenar latitudes e longitudes (o resto está em "PointSchema.js", na pasta "utils")
        type: PointSchema,
        index: '2dsphere'
    }
})

module.exports = mongoose.model('Dev',  DevSchema) // Permitindo exportar isso para outros documentos