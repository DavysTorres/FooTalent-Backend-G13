const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller')
const verificarToken = require('../middleware/auth');

router.post('/register', usuarioController.registroUsuario);
router.post('/login', usuarioController.loginUsuario);
router.get('/listar-usuario',  verificarToken, usuarioController.consultarUsuario);


router.post("/requestResetPassword", usuarioController.resetPasswordRequestController1);
router.post("/resetPassword", usuarioController.resetPasswordController1);

module.exports = router;