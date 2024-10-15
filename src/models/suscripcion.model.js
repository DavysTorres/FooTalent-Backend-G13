// Modelo de suscripciones para guardar los cursos que cada estudiante registre

const mongoose = require('mongoose');

const suscripcionSchema = mongoose.Schema({
    aprendizId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "usuario"
    },
    cursos: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "curso"
    },
    progreso: {
        type: Number,
        default: 0
    },
    estado: {
        type: String,
        enum: ['iniciado', 'en curso', 'suspendido', 'finalizado'],
        default: 'iniciado'
    },
    fechaFinalizacion: {
        type: Date,
        required:false
    },
    clasesCompletadas: [{
        type: mongoose.Types.ObjectId
    }]


});

module.exports = mongoose.model('suscripcion', suscripcionSchema);