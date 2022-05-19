const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vamoaprobarmail07@gmail.com',
        pass: '_123456789!'
    }
})

const send = async (ganador, correos, premio) => {
    let mailOptions = {
        from: 'vamoaprobarmail07@gmail.com',
        to: ['vamoaprobarmail07@gmail.com'].concat(correos),
        subject: `¡${ganador.nombre} ha ganado!`,
        html: `<h3> Anuncio: El ganador de ¿Quién ganará? fue ${ganador.nombre} y ha ganado ${premio}. <br/> ¡Gracias a todos por participar!</h3>`
    }

    try {
        const result = await transporter.sendMail(mailOptions)
        return result
    } catch (err) {
        throw err
    }
}

module.exports = { send }