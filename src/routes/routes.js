const express = require('express');
const router = express.Router();


//Subrutas
const usuarioRuta = require('./usuario.route');
//const  cursoRuta= require('curso')


router.use('/usuario', usuarioRuta);


module.exports = router;