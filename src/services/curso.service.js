const cursoModel = require('../models/curso.model');


exports.crearCurso = async (datoCurso) => {
    try {
      const cursoCreado = new cursoModel(datoCurso);
      cursoCreado.save();

        return { status: 201, mensaje: "Creación de curso exitoso", data: cursoCreado  };
      } catch (error) {
        return { status: 500, mensaje: error.message };
      }
};

exports.mostrarCursos = async() =>{

  try {
    const cursos = await cursoModel.find().populate('profesorId').populate('estudiantes');
    return { status: 200, mensaje: "Mostrar cursos exitoso", data: cursos };
  } catch (error) {
    return {status:500, mensaje: error.message};
  }
}

exports.editarCurso = async(id, datoCurso) => {

  try {
    const cursoActualizado = await cursoModel.findByIdAndUpdate(id, datoCurso, { new: true });

    if (!cursoActualizado) {
      return { status: 404, mensaje: "Curso no encontrado" };
    }

    return { status: 200, mensaje: "Edición del curso exitosa", data: cursoActualizado };
  } catch (error) {
    return { status: 500, mensaje: error.message };
  }
 
}
exports.eliminarCurso= async(id) =>{
  const cursoEliminado = await cursoModel.findByIdAndUpdate(id, { activo: false }, { new: true });{
    if (!cursoEliminado) {
      return { status: 404, mensaje: "Curso no encontrado" };
    }
    return { status: 200, mensaje: "Eliminicación del curso exitosa", data: cursoEliminado };
  }
}