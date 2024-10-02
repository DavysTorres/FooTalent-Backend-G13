const suscripcionService = require("../services/suscripcion.service");

exports.generarSuscripcion = async (req, res, next) => {
 
    const suscripcion = await suscripcionService.generarSuscripcion(req.body.idUsuario, req.body.idCurso);
        return res.json(suscripcion);
}

