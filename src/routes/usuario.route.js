const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller')
const verificarToken = require('../middleware/auth');

//Muestra todos los usuarios registrados
router.get('/listarUsuarios',  usuarioController.mostrarUsuarios);
//Registra un nuevo usuario
router.post('/register', usuarioController.registroUsuario);
//Verifica los datos para poder iniciar sesion
router.post('/login', usuarioController.loginUsuario);
//Devuelve un usuario por el token recibido despues de loguearse (funcion para devolver los datos al modificar perfil)
router.get('/listar-usuario',  verificarToken, usuarioController.consultarUsuario);
//Elimina un usuario de forma logica
router.delete('/eliminar/:id', usuarioController.eliminarUsuario);
//Edita un usuario
router.put('/editar/:id', usuarioController.editarUsuario)
//Peticion para comenzar un reestablecimiento de contraseña
router.post("/requestResetPassword", usuarioController.resetPasswordRequestController1);
//Reestablecimiento de contraseña 
router.post("/resetPassword", usuarioController.resetPasswordController1);
// Verifica la cuenta mediante un envio de correo electronico al crear una nueva cuenta
router.get('/verificarCuenta', usuarioController.verificarCuenta);

module.exports = router;