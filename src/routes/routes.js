const express = require('express');
const router = express.Router();


//Subrutas
const usuarioRuta = require('./usuario.route');
const  cursoRuta= require('./curso.route')


router.use('/usuario', usuarioRuta);
router.use('/curso', cursoRuta);


module.exports = router;