const axios = require('axios') // A axios permite a  chamada para outras API's
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

//index, show, store, update, destroy (geralmente essas são as 5 funções do controller)

module.exports = {
    async index(request, response) {
        const devs = await Dev.find() // Dá pra fazer filtros aqui dentro também
    },
    async store(request, response) { //Colocando "async" pois a api do github também pode demorar a responder
        const { github_username, techs, latitude, longitude } = request.body // Buscando a informação "github_username" e "techs" na request body (A partir da "github_username", vamos importar diversas outras informações pela API)

        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            // continuar apenas depois da API do github responder

            const { name = login, avatar_url, bio } = apiResponse.data //Selecionando apenas os dados que queremos da API do github
            /*if (!name) { Forma complicada de resolver situação em que o usuário não tem nome no github
                name = apiResponse.data.login
            }
            else {
                name = apiResponse.data.name
            }
            */
            const techsArray = parseStringAsArray(techs)

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            console.log(location, longitude, latitude)
        }

        return response.json(dev)
    }
}
