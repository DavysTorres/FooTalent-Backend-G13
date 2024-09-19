//cSpell: disable
const usuarioModel = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usuarioService = require('../services/usuario.service');
const {
        requestPasswordReset,
        resetPassword,
      } = require("../services/auth.service");

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

 exports.resetPasswordRequestController1 = async (req, res, next) => {
        const requestPasswordResetService = await requestPasswordReset(
          req.body.email
        );
        return res.json(requestPasswordResetService);
      };
      

exports.resetPasswordController1 = async (req, res, next) => {
        const resetPasswordService = await resetPassword(
          req.body.userId,
          req.body.token,
          req.body.password
        );
        return res.json(resetPasswordService);
      };
      
   
      
