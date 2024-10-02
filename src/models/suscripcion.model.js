// Modelo de suscripciones para guardar los cursos que cada estudiante registre

const mongoose = require('mongoose');

const suscripcionSchema = mongoose.Schema({
    estudiante: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    },
    cursos : {
        type: mongoose.Types.Array.ObjectId,
        required: true,
        ref: "curso"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatetAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Suscripción', suscripcionSchema);