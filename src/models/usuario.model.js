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
        enum: ['admin', 'Docente', 'Aprendiz'],
        required: false
    },
    verificado: {
        type: Boolean,
        required: false
    }
    
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('usuario', UsuarioSchema);

/* 



*/