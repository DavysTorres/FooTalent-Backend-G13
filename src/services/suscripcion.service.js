const suscripcionModel = require('../models/suscripcion.model');
const cursoModel = require('../models/curso.model');
const usuarioModel = require('../models/usuario.model');


exports.generarSuscripcion = async (usuarioId, cursoId) => {
    try {
        // Verificar si el usuario existe
        const usuario = await usuarioModel.findById(usuarioId);
        if (!usuario) {
          return { mensaje: 'Usuario no encontrado' };
        }
    
        // Verificar si el curso existe
        const curso = await cursoModel.findById(cursoId);
        if (!curso) {
          return { mensaje: 'Curso no encontrado' };
        }
    
        // Verificar si el usuario ya está suscrito al curso
        const suscripcionExistente = await suscripcionModel.findOne({ estudianteId:usuarioId, cursos:cursoId });
        if (suscripcionExistente) {
          return { mensaje: 'El usuario ya está suscrito a este curso' };
        }
    
        // Crear la nueva suscripción
        const nuevaSuscripcion = new suscripcionModel({
            estudianteId:usuarioId,
            cursos:cursoId,
          progreso: 0,
          fechaInicio: new Date()
        });
        await nuevaSuscripcion.save();
    
        // Añadir el ID del usuario a la lista de estudiantes del curso
        curso.estudiantes.push(usuarioId);
        await curso.save();
    
        return { mensaje: 'Suscripción creada exitosamente', suscripcion: nuevaSuscripcion };
      } catch (error) {
        return { mensaje: 'Error al crear la suscripción', error: error.message };
      }
}

exports.encontrarSuscripciones = async (idUsuario) => {


  try {

    const suscripciones = await suscripcionModel.find({estudianteId:idUsuario}).populate('cursos').sort({ createdAt: -1 });

    if(!suscripciones || suscripciones.length===0){
      return{mensaje: "Sin suscripciones"}
    }
    return { status: 200, mensaje: "Mostrar suscripciones exitoso", data: suscripciones };
  } catch (error) {
    return {status:500, mensaje: error.message};
  }
}

