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
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },
    //videos: [VideoSchema],
    aprendiz: [{
        type: Schema.Types.ObjectId,
        ref: 'usuario'
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
