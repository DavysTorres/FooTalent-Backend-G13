//cSpell: disable
const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: false
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
        enum: ['administrador', 'docente', 'estudiante'],
        required: false
    },
    numero_identificacion: {
        type: String,
        required: false
    },
    
    fecha_nacimiento: {
        type: Date,
        required: false
    },
    pais: {
        type: String,
        required: false
    },
    ciudad: {
        type: String,
        required: false
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('usuario', UsuarioSchema);
