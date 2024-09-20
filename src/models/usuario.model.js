//cSpell: disable
const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
<<<<<<< HEAD
        required: true
    },

=======
        required: false
    },
   
   
>>>>>>> 290483f39ac0bcd14735d97d9f67d5b055365561
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
<<<<<<< HEAD
        enum: ['admin', 'Docente', 'Aprendiz'],
        required: true
=======
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
>>>>>>> 290483f39ac0bcd14735d97d9f67d5b055365561
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('usuario', UsuarioSchema);

/* 



*/