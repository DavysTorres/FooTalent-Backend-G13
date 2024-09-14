//cSpell: disable
const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // Obtén el token del header Authorization
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    jwt.verify(token, 'key_secreto', (err, decoded) => {
        if (err) {
            return res.status(403).json({ mensaje: 'Token no válido' });
        }

        // Añade los datos del usuario a req
        req.usuario = { usuarioId: decoded.usuarioId, role: decoded.role };
        next();
    });
};

module.exports = verificarToken;
