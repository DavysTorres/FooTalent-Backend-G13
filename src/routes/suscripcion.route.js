const express = require('express');
const router = express.Router();

const suscripcionController = require('../controllers/suscripcion.controller')


router.post('/', suscripcionController.generarSuscripcion);

module.exports = router;