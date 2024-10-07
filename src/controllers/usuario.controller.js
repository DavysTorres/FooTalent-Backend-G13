//cSpell: disable
const usuarioService = require('../services/usuario.service');

exports.registroUsuario = async (req, res) => {

        const registro = await usuarioService.registrarUsuario(req.body);
        return res.json(registro);
};

// Inicio de sesión
exports.loginUsuario = async (req, res) => {

        const login = await usuarioService.loginUsuario(req.body);
        return res.json(login);
};


exports.mostrarUsuarios = async (req, res) => {
        const usuario = await usuarioService.mostrarUsuarios();
        return res.json(usuario);
    };
    

// Obtener perfil de usuario (requiere autenticación)
exports.consultarUsuario = async (req, res) => {

        const consultar = await usuarioService.consultarUsuario(req.usuario);
        return res.json(consultar);
};

exports.resetPasswordRequestController1 = async (req, res) => {
        const requestPasswordResetService = await usuarioService.requestPasswordReset(
                req.body.email
        );
        return res.json(requestPasswordResetService);
};

exports.resetPasswordController1 = async (req, res) => {
        const resetPasswordService = await usuarioService.resetPassword(
                req.body.userId,
                req.body.token,
                req.body.password
        );
        return res.json(resetPasswordService);
};

exports.verificarCuenta = async (req, res) => {
        const { token } = req.query;
        const resultado = await usuarioService.verificarCuenta(token);
        res.status(resultado.status).send(resultado.mensaje);
};


exports.eliminarUsuario = async (req, res) => {
        const usuario = await usuarioService.eliminarUsuario(req.params.id);
        return res.json(usuario);
}

exports.editarUsuario = async (req, res) => {
        const avatar = req.file ? req.file.path : null;
        const usuario = await usuarioService.editarUsuario(req.params.id, req.body,avatar);
        return res.json(usuario);
}