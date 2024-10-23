const cursoModel = require('../models/curso.model');
const usuarioModel = require('../models/usuario.model');
const cargarArchivo = require('../services/cargarArchivo.service');


exports.crearCurso = async (datoCurso) => {
  const { docenteId } = datoCurso;
  try {
    const docente = await usuarioModel.findById(docenteId)
    if (!docente || docente.length === 0) {
      return { status: 404, mensaje: 'Docente no encontrado' };
    }
    const cursoCreado = new cursoModel(datoCurso);
    cursoCreado.save();

    return { status: 201, mensaje: "Creación de curso exitoso", data: cursoCreado };
  } catch (error) {
    return { status: 500, mensaje: error.message };
  }
};

exports.mostrarCursos = async () => {

  try {
    const cursos = await cursoModel.find({ docenteId: { $type: 'objectId' } })  // Filtra solo si es un ObjectId válido
      .populate({
        path: 'docenteId',
        select: '_id nombre',
      })
      .sort({ createdAt: -1 });

    return { status: 200, mensaje: "Mostrar cursos exitoso", data: cursos };
  } catch (error) {
    return { status: 500, mensaje: error.message };
  }
};


exports.mostrarCursoPorId = async (id) => {
  try {
    const curso = await cursoModel.findById(id).populate(
      {
        path: 'docenteId',
        select: '_id nombre descripcion'
      }
    );

    if (!curso) {
      return { status: 404, mensaje: 'Curso no encontrado' };
    }

    return { status: 200, mensaje: 'Curso encontrado', data: curso };
  } catch (error) {
    return { status: 500, mensaje: error.message };
  }
};


exports.mostrarCursosPorUsuario = async (id) => {

  try {
    const usuario = await usuarioModel.findById(id); // Obtener el usuario de la base de datos
    if (!usuario) {
      return { mensaje: 'Usuario no encontrado' };
    }
    const cursosProfesor = await cursoModel.find({ docenteId: { $type: 'objectId' } })
      .populate({
        path: 'docenteId',
        select: '_id nombre',
      })
      .sort({ createdAt: -1 });;
    if (!cursosProfesor || cursosProfesor.length === 0) {
      return { mensaje: "Docente sin cursos", status: 404 }
    }
    return { data: cursosProfesor, mensaje: "Cursos mostrados exitosamente", status: 200 };

  } catch (error) {
    return { mensaje: 'Error al obtener los cursos', error: error.message, status: 500 };
  }
}

exports.editarCurso = async (id, datoCurso, imagen) => {

  try {
    // Encuentra el curso actual para obtener la ruta de la imagen antiguo
    const cursoActual = await cursoModel.findById(id);
    if (!cursoActual) {
      return { status: 404, mensaje: "curso no encontrado" };
    }
    // Si hay un nuevo avatar y un avatar antiguo, borra el antiguo
    if (imagen && cursoActual.imagen) {
      cargarArchivo.borrarAntiguaFoto(cursoActual.imagen)
    }

    const cursoActualizado = await cursoModel.findByIdAndUpdate(id, { ...datoCurso, imagen: imagen }, { new: true });

    if (!cursoActualizado) {
      return { status: 404, mensaje: "Curso no encontrado" };
    }

    return { status: 200, mensaje: "Edición del curso exitosa", data: cursoActualizado };
  } catch (error) {
    return { status: 500, mensaje: error.message };
  }

}
exports.eliminarCurso = async (id) => {
  const cursoEliminado = await cursoModel.findByIdAndUpdate(id, { activo: false }, { new: true }); {
    if (!cursoEliminado) {
      return { status: 404, mensaje: "Curso no encontrado" };
    }
    return { status: 200, mensaje: "Eliminicación del curso exitosa", data: cursoEliminado };
  }
}