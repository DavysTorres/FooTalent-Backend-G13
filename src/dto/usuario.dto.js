const Joi = require('joi');

const RegistrarUsuarioDTO = Joi.object({
    nombre: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required(),
}).options({ stripUnknown: true });

const EditarUsuarioDTO = Joi.object({
    nombre: Joi.string().min(2).optional(),
    avatar: Joi.string().uri().optional(),
    descripcion: Joi.string().max(500).optional(),
}).options({ stripUnknown: true });

const MostrarUsuarioPorIdDTO = Joi.object({
    nombre: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().required(),
    avatar: Joi.string().optional(),
    descripcion: Joi.string().max(500).optional(),
}).options( { stripUnknown: true });

module.exports = { RegistrarUsuarioDTO, EditarUsuarioDTO, MostrarUsuarioPorIdDTO };