const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ClaseSchema = new Schema({

    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
    },
    video:{
        type:String
    },
    duracion: {
        type: Number,
    },
    cursoId: {
        type: Schema.Types.ObjectId,
        ref: 'curso',
        required:true
    },
    eliminado:{
        type:Boolean,
        default:false
    },
    documentos:[{
        type:String
    }]


}, {
    versionKey: false,
    timestamps: true
});


module.exports = mongoose.model('clase', ClaseSchema);