const express = require('express');
const router = express.Router();

const claseController = require('../controllers/clase.controller');
const { cargarDocumentos } = require('../services/cargarArchivo.service');

//Crear una clase
router.post('/', claseController.crearClase);
//Elimina una clase de una forma logica
router.delete('/:id', claseController.eliminarClase);
//Edita la informacion de una clase
router.put('/:id',cargarDocumentos.array('documentos', 3), claseController.editarClase);
//Muestra una clase según el ID del curso
router.get('/:id', claseController.mostrarClasePorId);





module.exports = router;