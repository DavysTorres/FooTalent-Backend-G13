const suscripcionService = require("../services/suscripcion.service");

exports.generarSuscripcion = async (req, res, next) => {
 
    const suscripcion = await suscripcionService.generarSuscripcion(req.body.idUsuario, req.body.idCurso);
    return res.status(suscripcion.status).json(suscripcion);
}


exports.encontrarSuscripciones = async (req, res, next) => {
 
    const suscripcion = await suscripcionService.encontrarSuscripciones(req.params.idUsuario);

    return res.status(suscripcion.status).json(suscripcion);
}


