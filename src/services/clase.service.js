const cursoModel = require('../models/curso.model');
const claseModel = require('../models/clase.model');




exports.crearClase = async (datoClase) => {
    const {cursoId} =datoClase;
    try {
      const curso = await cursoModel.findById(cursoId)
      if(!curso || curso.length===0){
        return { status: 404, mensaje: 'Curso no encontrado' };
      }
      const claseCreado = new claseModel(datoClase);
      claseCreado.save();

        return { status: 201, mensaje: "Creación de clase exitoso", data: claseCreado };
      } catch (error) {
        return { status: 500, mensaje: error.message };
      }
};



exports.eliminarClase= async(id) =>{
    const claseEliminado = await claseModel.findByIdAndUpdate(id, { eliminado: true }, { new: true });{
      if (!claseEliminado) {
        return { status: 404, mensaje: "Clase no encontrada" };
      }
      return { status: 200, mensaje: "Elimininación de la clase exitosa", data: claseEliminado };
    }
  }


  exports.editarClase = async(id, datoClase) => {

    try {
      // Encuentra el clase actual para obtener la ruta de la imagen antiguo
      const claseActual = await claseModel.findById(id);
      if (!claseActual) {
        return { status: 404, mensaje: "clase no encontrada" };
      }
      // Si hay un nuevo avatar y un avatar antiguo, borra el antiguo
      /*if (imagen && claseActual.imagen) {
        cargarArchivo.borrarAntiguaFoto(claseActual.imagen)
      }
  */
      const claseActualizado = await claseModel.findByIdAndUpdate(id, datoClase, { new: true });
  
      if (!claseActualizado) {
        return { status: 404, mensaje: "clase no encontrado" };
      }
  
      return { status: 200, mensaje: "Edición de la clase exitosa", data: claseActualizado };
    } catch (error) {
      return { status: 500, mensaje: error.message };
    }
  }  

  
exports.mostrarClasePorId = async (id) => {
    try {
      
      const clase = await claseModel.find({cursoId:id})
  
      if (!clase) {
        return { status: 404, mensaje: 'Clases no encontradas' };
      }
  
      return { status: 200, mensaje: 'Clases encontradas', data: clase };
    } catch (error) {
      return { status: 500, mensaje: error.message };
    }
  };