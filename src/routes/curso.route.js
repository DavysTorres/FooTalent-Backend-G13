const express = require('express');
const router = express.Router();

const cursoController = require('../controllers/curso.controller')

//Crear un curso
router.post('/', cursoController.crearCurso);
//Muestra todos los cursos
router.get('/', cursoController.mostrarCurso);
//Muestra un curso según el ID del curso
router.get('/:id', cursoController.mostrarCursoPorId);
//Edita la informacion de un curso
router.put('/:id', cursoController.editarCurso);
//Elimina un curso de una forma logica
router.delete('/:id', cursoController.eliminarCurso);
//Muestra un curso según el id de un usuario, ya sea profesor o alumno
router.get('/cursos/:id', cursoController.mostrarCursosPorUsuario);

module.exports = router;