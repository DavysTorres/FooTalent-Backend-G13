const Joi = require('joi');
const mongoose = require('mongoose');
const { EditarUsuarioDTO } = require('./usuario.dto');

// DTO para la creación de curso
const CrearCursoDTO = Joi.object({
  nombre: Joi.string().min(3).max(100).required(),
  descripcion: Joi.string().min(5).max(500).required(),
  // Validación para asegurarse de que sea un ObjectId de MongoDB
  docenteId: Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.message('docenteId debe ser un ID válido');
    }
    return value;
  }).required(),

}).options({ stripUnknown: true });







const MostrarTodosCursosDTO = Joi.array().items(
  Joi.object({
    _id: Joi.custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('El IdCurso debe ser un ID válido');
      }
      return value;
    }).required(),

    nombre: Joi.string().required(),
    descripcion: Joi.string().required(),
    imagen: Joi.string().allow(null).optional(),
    activo:Joi.boolean().required(),

    docenteId: Joi.object({
      _id: Joi.custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('El IdDocente debe ser un ID válido');
        }
        return value;
      }).optional(),
      nombre: Joi.string().allow('').optional(),  // Permite valores vacíos
    }).optional(),
    clases: Joi.array().items(
      Joi.custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Cada Id de clase debe ser un ID válido');
        }
        return value;
      })
    ).optional(),
    aprendiz: Joi.array().items(
      Joi.custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Cada Id de Aprendiz debe ser un ID válido');
        }
        return value;
      })
    ).optional(),

    createdAt: Joi.date().required(),
  })

).options({ stripUnknown: true });




const MostrarTodosCursosPorIDDTO =
  Joi.object({
    _id: Joi.custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('El IdCurso debe ser un ID válido');
      }
      return value;
    }).required(),

    nombre: Joi.string().required(),
    descripcion: Joi.string().required(),
    imagen: Joi.string().allow(null).optional(),
    activo: Joi.boolean().required(),
    que_aprenderas: Joi.string().optional(),
    requisitos: Joi.string().optional(),
    razon_eleccion: Joi.string().optional(),
    informacion_adicional: Joi.string().optional(),
    duracion: Joi.string().optional(),

    docenteId: Joi.object({
      _id: Joi.custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('El IdDocente debe ser un ID válido');
        }
        return value;
      }).optional(),
      nombre: Joi.string().allow('').optional(),  // Permite valores vacíos
      descripcion: Joi.string().allow('').optional(),  // Permite valores vacíos
    }).optional(),

    createdAt: Joi.date().required(),

    aprendiz: Joi.array().items(
      Joi.custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Cada Id de Aprendiz debe ser un ID válido');
        }
        return value;
      })
    ).optional(),
    clases: Joi.array().items(
      Joi.custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Cada Id de clase debe ser un ID válido');
        }
        return value;
      })
    ).optional()
  }).options({ stripUnknown: true });

  const EditarCursoDTO = Joi.object({
    nombre: Joi.string().min(2).optional(),
    descripcion: Joi.string().max(500).optional(),
    imagen: Joi.string().optional(),
    que_aprenderas: Joi.string().max(500).optional(),
    razon_eleccion: Joi.string().max(500).optional(),
    informacion_adicional: Joi.string().max(500).optional(),
    duracion: Joi.string().max(500).optional(),
    requisitos: Joi.string().max(500).optional(),
  }).options({ stripUnknown: true });













module.exports = { CrearCursoDTO, MostrarTodosCursosDTO, MostrarTodosCursosPorIDDTO, EditarCursoDTO };
