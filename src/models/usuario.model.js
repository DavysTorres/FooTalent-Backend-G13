//cSpell: disable
const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apodo: {
        type: String,
        required: true
    },
    genero: {
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
    avatar: {
        type: String
    },
    role: {
        type: String,
        enum: ['adulto', 'familia', 'terapeuta'],
        required: true
    },
    numero_identificacion: {
        type: String,
        required: true
    },
    eps: {
        type: String,
        required: true
    },
    fecha_nacimiento: {
        type: Date,
        required: true
    },
    pais: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('usuario', UsuarioSchema);
