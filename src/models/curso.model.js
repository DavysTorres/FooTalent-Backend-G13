//cSpell: disable
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CursoSchema = new Schema({

    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen:{
        type:String
    },
    docenteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'docente',
        required: true
    },
    //videos: [VideoSchema],
    estudiantes: [{
        type: Schema.Types.ObjectId,
        ref: 'aprendiz'
    }],
    activo: {
        type: Boolean,
        default:true
    }

}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('curso', CursoSchema);
