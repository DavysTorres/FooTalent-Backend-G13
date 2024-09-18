//cSpell: disable
const usuarioModel = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registroUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Verificar que la contraseña esté presente
        if (!password) {
            return res.status(400).json({ mensaje: 'La contraseña es obligatoria' });
        }
        //validacion si el usuario existe
        const existeUsuario = await usuarioModel.findOne({ email });
        if (existeUsuario) {
            return res.status(400).send({ mensaje: 'Usuario ya existe' });
        }
        // encriptar contaseña
        const passwordEncriptado = await bcrypt.hash(password, 10)
        //creacion de usuario
        const usuario = new usuarioModel({ ...req.body, password: passwordEncriptado });
        // Guardar el usuario en la base de datos
        await usuario.save();
        res.status(201).send({ mensaje: 'Usuario creado correctamente', usuario });
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un problema al crear el usuario");
    }
}

// Inicio de sesión
exports.loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar al usuario por email
        const usuario = await usuarioModel.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ mensaje: 'Email o contraseña incorrectos' });
        }

        // Verificar la contraseña
        const passwordCorrecto = await bcrypt.compare(password, usuario.password);
        if (!passwordCorrecto) {
            return res.status(400).json({ mensaje: 'Email o contraseña incorrectos' });
        }

        // Crear y firmar un token
        const token = jwt.sign({ usuarioId: usuario._id, role: usuario.role }, 'key_secreto', { expiresIn: '1h' });

        res.json({ token, usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email, role: usuario.role } });
    } catch (error) {
        res.status(500).json({ error: error.mensaje });
    }
};

// Obtener perfil de usuario (requiere autenticación)
exports.consultarUsuario = async (req, res) => {
    try {
        // Asegúrate de que req.usuario.usuarioId esté correctamente definido
        if (!req.usuario || !req.usuario.usuarioId) {
            return res.status(400).json({ mensaje: 'Usuario no autenticado' });
        }

        const usuario = await usuarioModel.findById(req.usuario.usuarioId);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json({ id: usuario._id, nombre: usuario.nombre, email: usuario.email, role: usuario.role });
    } catch (error) {
        console.error(error); // Asegúrate de ver el error en los logs
        res.status(500).json({ error: 'Hubo un problema al consultar el usuario' });
    }
};
