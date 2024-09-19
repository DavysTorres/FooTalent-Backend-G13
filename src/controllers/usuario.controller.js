//cSpell: disable
const usuarioModel = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usuarioService = require('../services/usuario.service');

exports.registroUsuario = async (req, res, next) => {
  
        const registro = await usuarioService.registrarUsuario(req.body);
        return res.json(registro);
       
   
};


// Inicio de sesión
exports.loginUsuario = async (req, res, next) => {
   
        const login = await usuarioService.loginUsuario(req.body);
        return res.json(login);
  
};

// Obtener perfil de usuario (requiere autenticación)
exports.consultarUsuario = async (req, res) => {
    
        const consultar = await usuarioService.consultarUsuario(req.usuario);
        return res.json(consultar);
   
};
