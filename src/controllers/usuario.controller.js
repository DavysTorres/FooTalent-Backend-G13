//cSpell: disable

<<<<<<< HEAD
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
=======
const usuarioService = require('../services/usuario.service');


exports.registroUsuario = async (req, res, next) => {
  
        const registro = await usuarioService.registrarUsuario(req.body);
        return res.json(registro);
       
   
};

>>>>>>> 290483f39ac0bcd14735d97d9f67d5b055365561

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
        const requestPasswordResetService = await usuarioService.requestPasswordReset(
          req.body.email
        );
        return res.json(requestPasswordResetService);
      };
      

exports.resetPasswordController1 = async (req, res, next) => {
        const resetPasswordService = await usuarioService.resetPassword(
          req.body.userId,
          req.body.token,
          req.body.password
        );
        return res.json(resetPasswordService);
      };
      
   
      
