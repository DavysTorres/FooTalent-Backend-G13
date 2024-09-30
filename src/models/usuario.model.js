//cSpell: disable
const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
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
        enum: ['Admin', 'Docente', 'Aprendiz'],
        default: 'Aprendiz',
        required: true
    },
    verificado: {
        type: Boolean,
        default: false
    }



},


    {
        versionKey: false,
        timestamps: true
    });

module.exports = mongoose.model('usuario', UsuarioSchema);
