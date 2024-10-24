const usuarioModel = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Token = require("../models/Token.model");
const sendEmail = require("../utils/email/sendEmail");
const crypto = require("crypto");

const cargarArchivo = require('../services/cargarArchivo.service');
const path = require('path');


const JWTSecret = process.env.JWT_SECRET;
const bcryptSalt = process.env.BCRYPT_SALT;
const clientURL = process.env.CLIENT_URL;
const clientURLFront=process.env.CLIENT_URL_FRONTEND_PRODUCCION;


exports.registrarUsuario = async (datoUsuario) => {
  const { nombre, email, password, role } = datoUsuario;
  try {
    // Verificar que la contraseña esté presente
    if (!password) {
      return { status: 400, mensaje: 'La contraseña es obligatoria' };
    }

    // Validación si el usuario existe
    const existeUsuario = await usuarioModel.findOne({ email });
    if (existeUsuario) {
      return { status: 409, mensaje: 'Usuario ya existe' };
    }

    // Encriptar contraseña
    const passwordEncriptado = await bcrypt.hash(password, 10);

    // Creación de usuario
    const usuario = new usuarioModel({ nombre, email, password: passwordEncriptado, role });

    // Guardar el usuario en la base de datos
    const token = jwt.sign({ email }, JWTSecret, { expiresIn: '1h' });

    const link = `${clientURLFront}/verifyAccount?token=${token}`;


    sendEmail(
      usuario.email,
      "Confirmar cuenta",
      {
        name: usuario.nombre,
        link: link,
      },
      "./template/confirmarCuenta.handlebars"
    );
    await usuario.save();


    return { status: 201, mensaje: 'Usuario creado correctamente. Revisa tu email para verificar la cuenta.', data: usuario };
  } catch (error) {
    console.log(error);
    return { status: 500, mensaje: error.message };
  }
};

exports.loginUsuario = async ({ email, password }) => {
  try {
      // Buscar al usuario por email
      const usuario = await usuarioModel.findOne({ email });
      if (!usuario) {
          return { status: 400, mensaje: 'Email o contraseña incorrectos' };
      }

        // Verificar la contraseña
        const passwordCorrecto = await bcrypt.compare(password, usuario.password);
        if (!passwordCorrecto) {
            return { status: 400, mensaje: 'Email o contraseña incorrectos' };
        }

        // Verificar si la cuenta ha sido verificada
     /*   if (!usuario.verificado) {
          return { status: 400, mensaje: 'Cuenta no verificada. Por favor, revisa tu correo.' };
      }
*/
        // Crear y firmar un token JWT
        const token = jwt.sign({ usuarioId: usuario._id, role: usuario.role }, JWTSecret, { expiresIn: '1h' });

        return { 
            status: 200, 
            mensaje: 'Login exitoso', 
            data: { 
                token, 
                usuario: { 
                    id: usuario._id, 
                    nombre: usuario.nombre, 
                    email: usuario.email, 
                    role: usuario.role,
                    avatar:usuario.avatar 
                } 
            } 
        };
    } catch (error) {
        console.log('Error en el login:', error);
        return { status: 500, mensaje: 'Hubo un problema al iniciar sesión' };
    }

    
};




exports.mostrarUsuarios = async () => {
  try {
    const usuarios = await usuarioModel.find().sort({ createdAt: -1 });
    if (!usuarios) {
      return { mensaje: "Usuarios no encontrados", status:400 }
    }
    return { status: 200, mensaje: "Mostrar usuarios exitoso", data: usuarios };
  } catch (error) {
    return { status: 500, mensaje: error.message };
  }
};





exports.consultarUsuario = async (usuarioId) => {
  try {
    // Asegúrate de que usuarioId esté correctamente definido
    if (!usuarioId) {
      return { status: 404, mensaje: 'Usuario no autenticado' };
    }

    const usuario = await usuarioModel.findById(usuarioId);
    if (!usuario) {
      return { status: 404, mensaje: 'Usuario no encontrado' };
    }

    return { status: 200, mensaje: 'Usuario encontrado', data: { id: usuario._id, nombre: usuario.nombre, email: usuario.email, role: usuario.role } };
  } catch (error) {
    console.error(error); // Asegúrate de ver el error en los logs
    return { status: 500, mensaje: 'Hubo un problema al consultar el usuario' };
  }
};

exports.consultarUsuarioPorId = async (usuarioId) => {
  try {
    // Asegúrate de que usuarioId esté correctamente definido
    if (!usuarioId) {
      return { status: 404, mensaje: 'Usuario no autenticado' };
    }
    const usuario = await usuarioModel.findById(usuarioId, 'nombre email role avatar descripcion');
    if (!usuario) {
      return { status: 404, mensaje: 'Usuario no encontrado' };
    }
    return { status: 200, mensaje: 'Usuario encontrado', data: usuario };
  } catch (error) {
    console.error(error); // Asegúrate de ver el error en los logs
    return { status: 500, mensaje: 'Hubo un problema al consultar el usuario' };
  }
};

exports.requestPasswordReset = async (email) => {
  const user = await usuarioModel.findOne({ email });
  if (!user) throw new Error("Email no existe");

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `${clientURLFront}/reset?token=${resetToken}&id=${user._id}`;
  sendEmail(
    user.email,
    "Password Reset Request",
    {
      name: user.nombre,
      link: link,
    },
    "./template/requestResetPassword.handlebars"
  );
  return { link };
};

exports.resetPassword = async (userId, token, password) => {
  let passwordResetToken = await Token.findOne({ userId });

  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }
  const isValid = await bcrypt.compare(token, passwordResetToken.token);

  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }
  const hash = await bcrypt.hash(password, Number(bcryptSalt));
  await usuarioModel.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );
  const user = await usuarioModel.findById({ _id: userId });
  sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.nombre,
    },
    "./template/resetPassword.handlebars"
  );
  await passwordResetToken.deleteOne();
  return { message: "Password reset was successful" };
};


exports.verificarCuenta = async (token) => {
  try {
    const { email } = jwt.verify(token, JWTSecret);
    const usuario = await usuarioModel.findOne({ email });
    if (!usuario) {
      return { status: 404, mensaje: 'Usuario no encontrado' };
    }
    usuario.verificado = true;
    await usuario.save();
    return { status: 200, mensaje: 'Cuenta verificada correctamente' };
  } catch (error) {
    return { status: 403, mensaje: 'Token inválido o expirado' };
  }
};




exports.eliminarUsuario = async (id) => {
  const usuarioEliminado = await usuarioModel.findByIdAndUpdate(id, { eliminado: true }, { new: true }); {
    if (!usuarioEliminado) {
      return { status: 404, mensaje: "usuario no encontrado" };
    }
    return { status: 200, mensaje: "Eliminicación del usuario exitosa", data: usuarioEliminado };
  }
}

exports.editarUsuario = async (id, datoUsuario, avatar) => {
  try {
    // Encuentra el usuario actual para obtener la ruta del avatar antiguo
    const usuarioActual = await usuarioModel.findById(id);

    // Si hay un nuevo avatar y un avatar antiguo, borra el antiguo
    /*if (avatar && usuarioActual.avatar) {
      const oldAvatarPath = path.join(__dirname, '..', usuarioActual.avatar); 
      cargarArchivo.borrarAntiguaFoto(oldAvatarPath);
    }
*/
    // Si no encuentra el usuario
    if (!usuarioActual) {
      return { status: 404, mensaje: "Usuario no encontrado" };
    }

    // Asegúrate de que 'avatar' cozntenga solo el nombre del archivo (ruta relativa)
    const relativeAvatarPath = avatar ? `${avatar}` : usuarioActual.avatar;

    // Actualiza el usuario con la nueva información, incluyendo el avatar
    const usuarioActualizado = await usuarioModel.findByIdAndUpdate(id, { 
      nombre: datoUsuario.nombre, 
      descripcion: datoUsuario.descripcion, 
      avatar: relativeAvatarPath  // Guarda la ruta relativa
    }, { new: true });

    // Si no encuentra el usuario actualizado
    if (!usuarioActualizado) {
      return { status: 404, mensaje: "Usuario no encontrado" };
    }

    return { status: 200, mensaje: "Edición del usuario exitosa", data: usuarioActualizado };
  } catch (error) {
    return { status: 500, mensaje: error.message };
  }
}







