const express = require('express');
const router = express.Router();

const suscripcionController = require('../controllers/suscripcion.controller')

//genera una suscripcion/inscripcion de un estudiante a un curso
router.post('/', suscripcionController.generarSuscripcion);
router.get('/:idUsuario', suscripcionController.encontrarSuscripciones);
router.get('/mostrarPorId/:id', suscripcionController.encontrarSuscripcionesId)
router.post('/agregarClaseCompletada/:id/:clasesCompletadas', suscripcionController.agregarClaseCompletadas);

module.exports = router;