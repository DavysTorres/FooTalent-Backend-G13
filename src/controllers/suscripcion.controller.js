const suscripcionService = require("../services/suscripcion.service");

exports.generarSuscripcion = async (req, res, next) => {
 
    const suscripcion = await suscripcionService.generarSuscripcion(req.body.idUsuario, req.body.idCurso);
    return res.status(suscripcion.status).json(suscripcion);
}


exports.encontrarSuscripciones = async (req, res, next) => {
 
    const suscripcion = await suscripcionService.encontrarSuscripciones(req.params.idUsuario);

    return res.status(suscripcion.status).json(suscripcion);
}

exports.agregarClaseCompletadas= async (req, res) =>{
    const suscripcion = await suscripcionService.agregarClaseCompletada(req.params.id, req.params.clasesCompletadas);
    return res.status(suscripcion.status).json(suscripcion);
}


exports.encontrarSuscripcionesId = async (req, res, next) => {
 
    const suscripcion = await suscripcionService.encontrarSuscripcionesId(req.params.id);

    return res.status(suscripcion.status).json(suscripcion);
}

