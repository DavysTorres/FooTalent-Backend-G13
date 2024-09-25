//cSpell: disable
const mongoose = require('mongoose');

const CursoSchema = mongoose.Schema({

    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    profesorId: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },
    videos: [VideoSchema],
    estudiantes: [{
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    }]

}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('curso', CursoSchema);

/* 



*/