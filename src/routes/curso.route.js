const express = require('express');
const router = express.Router();

const cursoController = require('../controllers/curso.controller')


router.post('/crearCurso', cursoController.crearCurso);
router.get('/listarCursos', cursoController.mostrarCurso);
router.get('/obtenerCurso/:id', cursoController.obtenerCursoPorId);
router.put('/editarCurso/:id', cursoController.editarCurso);
router.delete('/eliminarCurso/:id', cursoController.eliminarCurso);

module.exports = router;