//Verificación de Roles Para restringir el acceso a ciertas rutas

const verificaRole = (roles) => {
    return (req, res, next) => {
      const usuarioRole = req.usuario.role;
      if (!roles.includes(usuarioRole)) {
        return res.status(403).json({ message: 'Acceso denegado' });
      }
      next();
    };
  };
  
  module.exports = verificaRole;