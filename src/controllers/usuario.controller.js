//cSpell: disable
const { RegistrarUsuarioDTO, EditarUsuarioDTO, MostrarUsuarioPorIdDTO } = require('../dto/usuario.dto');
const { upload } = require('../services/cargarArchivo.service');

const { subirArchivoACloudinary } = require('../services/cloudinary.service');
const usuarioService = require('../services/usuario.service');
const multer = require('multer');

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
        upload.single('avatar')(req, res, async (err) => {
          if (err) {
            return res.status(400).json({ mensaje: "Error al subir el archivo", error: err.message });
          }
      
          try {
            const file = req.file;
            const userId = req.params.id;
            
            // Validar datos de usuario (req.body)
            const { error, value: datosValidados } = EditarUsuarioDTO.validate(req.body);
            if (error) {
              return res.status(400).json({ error: error.details });
            }
      
            let avatarUrl = null;
            if (file) {
              // Subir el archivo a Cloudinary
              const resultado = await subirArchivoACloudinary(file.buffer, userId);
              avatarUrl = resultado.url;
            }
      
            // Llamar al servicio para actualizar el usuario
            const usuario = await usuarioService.editarUsuario(userId, datosValidados, avatarUrl);
      
            return res.status(usuario.status).json(usuario);
          } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al procesar la solicitud', error: error.message });
          }
        });
      };