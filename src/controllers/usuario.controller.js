//cSpell: disable
const { RegistrarUsuarioDTO, EditarUsuarioDTO, MostrarUsuarioPorIdDTO } = require('../dto/usuario.dto');
const usuarioService = require('../services/usuario.service');

exports.registroUsuario = async (req, res) => {
        const { error, value: datosValidados } = RegistrarUsuarioDTO.validate(req.body);
        if (error) {
                return res.status(400).json({ error: error.details });
        }
        const registro = await usuarioService.registrarUsuario(datosValidados);
        return res.status(registro.status).json(registro);
};

// Inicio de sesión
exports.loginUsuario = async (req, res) => {

        const login = await usuarioService.loginUsuario(req.body);
        return res.status(login.status).json(login);
};


exports.mostrarUsuarios = async (req, res) => {
        const usuario = await usuarioService.mostrarUsuarios();
        return res.status(usuario.status).json(usuario);
};


// Obtener perfil de usuario (requiere autenticación)
exports.consultarUsuario = async (req, res) => {
        const usuario = await usuarioService.consultarUsuario(req.usuario);
        return res.status(usuario.status).json(usuario)
};

exports.consultarUsuarioPorId = async (req, res) => {

        const usuario = await usuarioService.consultarUsuarioPorId(req.params.id);
        if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        const usuarioPlano = usuario.data.toObject()

        const datosValidados = MostrarUsuarioPorIdDTO.validate(usuarioPlano);
        
        console.log(datosValidados);
        if (datosValidados.error) {
                return res.status(500).json({ error: datosValidados.error.details });
        }
        res.status(200).json(datosValidados.value);
};

exports.resetPasswordRequestController1 = async (req, res) => {
        const requestPasswordResetService = await usuarioService.requestPasswordReset(
                req.body.email
        );
        return res.json(requestPasswordResetService)
};

exports.resetPasswordController1 = async (req, res) => {
        const resetPasswordService = await usuarioService.resetPassword(
                req.body.userId,
                req.body.token,
                req.body.password
        );
        return res.json(resetPasswordService)
};

exports.verificarCuenta = async (req, res) => {
        const { token } = req.query;
        const resultado = await usuarioService.verificarCuenta(token);
        res.status(resultado.status).send(resultado.mensaje);
};


exports.eliminarUsuario = async (req, res) => {
        const usuario = await usuarioService.eliminarUsuario(req.params.id);
        return res.status(usuario.status).json(usuario);
}

exports.editarUsuario = async (req, res) => {
        // Aquí debes usar req.file.filename para obtener solo el nombre del archivo
        const avatar = req.file ? req.file.filename : null;
        console.log("Avatar: ", avatar);
    
        const { error, value: datosValidados } = EditarUsuarioDTO.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details });
        }
    
        console.log("Value:", datosValidados);
    
        // Llamada al servicio, pasando solo el nombre del archivo como 'avatar'
        const usuario = await usuarioService.editarUsuario(req.params.id, datosValidados, avatar);
    
        return res.status(usuario.status).json(usuario);
    };
    