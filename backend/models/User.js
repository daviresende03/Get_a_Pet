const mongoose = require('../db/conn')
const { Schema } = mongoose

const User = mongoose.model(
    'User',
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        phone: {
            type: String,
            required: true
        }
    }, 
    { timestamps: true }, //Criar coluna de ultimaModificacao e criacao
    ),
)

module.exports = User
