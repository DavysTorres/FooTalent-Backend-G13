const express = require('express');
const router = express.Router();

const cursoController = require('../controllers/curso.controller')


router.post('/', cursoController.crearCurso);
router.get('/', cursoController.mostrarCurso);
router.get('/:id', cursoController.mostrarCursoPorId);
router.put('/:id', cursoController.editarCurso);
router.delete('/:id', cursoController.eliminarCurso);
router.get('/cursos/:id', cursoController.mostrarCursoPorRol);

module.exports = router;