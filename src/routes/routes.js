const express = require('express');
const router = express.Router();


//Subrutas
const usuarioRuta = require('./usuario.route');
const  cursoRuta= require('./curso.route')
const suscripcionRuta= require('./suscripcion.route')
const claseRuta= require('./clase.route')


router.use('/usuario', usuarioRuta);
router.use('/curso', cursoRuta);
router.use('/suscripcion', suscripcionRuta);
router.use('/clase', claseRuta);


module.exports = router;