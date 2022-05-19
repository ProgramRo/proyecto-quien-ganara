const axios = require('axios')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')

const nuevoUsuario = async () => {
    
    try {
        const { data } = await axios.get('https://randomuser.me/api')
        const usuario = data.results[0]
        const user = {
            id: uuidv4().slice(30),
            correo: usuario.email,
            nombre: `${usuario.name.title} ${usuario.name.first} ${usuario.name.last}`,
            foto: usuario.picture.large,
            pais: usuario.location.country,
        }
        // Se hace un return, ya que, como está siendo llamada desde el servidor, necesitamos que ésta información (objeto creado gracias al consumo de la API), llegue al servidor
        return user
    } catch(err) {
        throw err
    }

}

const guardarUsuario = (usuario) => {
    const usuariosJSON = JSON.parse(fs.readFileSync('usuarios.json', 'utf-8'))
    usuariosJSON.usuarios.push(usuario)
    fs.writeFileSync('usuarios.json', JSON.stringify(usuariosJSON))
}

module.exports = { nuevoUsuario, guardarUsuario }