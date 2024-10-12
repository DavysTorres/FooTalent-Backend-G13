const suscripcionModel = require('../models/suscripcion.model');
const cursoModel = require('../models/curso.model');
const usuarioModel = require('../models/usuario.model');


exports.generarSuscripcion = async (usuarioId, cursoId) => {
    try {
        // Verificar si el usuario existe
        const usuario = await usuarioModel.findById(usuarioId);
        if (!usuario) {
          return { mensaje: 'Usuario no encontrado', status:404 };
        }
    
        // Verificar si el curso existe
        const curso = await cursoModel.findById(cursoId);
        if (!curso) {
          return { mensaje: 'Curso no encontrado', status:404 };
        }
    
        // Verificar si el usuario ya está suscrito al curso
        const suscripcionExistente = await suscripcionModel.findOne({ aprendizId:usuarioId, cursos:cursoId });
        if (suscripcionExistente) {
          return { mensaje: 'El usuario ya está suscrito a este curso' };
        }
    
        // Crear la nueva suscripción
        const nuevaSuscripcion = new suscripcionModel({
            aprendizId:usuarioId,
            cursos:cursoId,
          progreso: 0,
          fechaInicio: new Date()
        });
        await nuevaSuscripcion.save();
    
        // Añadir el ID del usuario a la lista de estudiantes del curso
        curso.aprendiz.push(usuarioId);
        await curso.save();
    
        return { mensaje: 'Suscripción creada exitosamente', suscripcion: nuevaSuscripcion, status:201 };
      } catch (error) {
        return { mensaje: 'Error al crear la suscripción', error: error.message, status:400 };
      }
}

exports.encontrarSuscripciones = async (idUsuario) => {


  try {

    const suscripciones = await suscripcionModel.find({aprendizId:idUsuario}).populate('cursos').sort({ createdAt: -1 });

    if(!suscripciones || suscripciones.length===0){
      return{mensaje: "Suscripcion no encontrada", status: 404}
    }
    return { status: 200, mensaje: "Mostrar suscripciones exitoso", data: suscripciones };
  } catch (error) {
    return {status:500, mensaje: error.message};
  }
}

