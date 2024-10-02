const express = require('express');
const router = express.Router();

const suscripcionController = require('../controllers/suscripcion.controller')

//genera una suscripcion/inscripcion de un estudiante a un curso
router.post('/', suscripcionController.generarSuscripcion);

module.exports = router;