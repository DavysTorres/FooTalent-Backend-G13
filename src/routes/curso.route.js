const express = require('express');
const router = express.Router();

const cursoController = require('../controllers/curso.controller')


router.post('/', cursoController.crearCurso);
router.get('/', cursoController.mostrarCurso);
router.put('/:id', cursoController.editarCurso);


module.exports = router;