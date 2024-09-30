const cursoService = require('../services/curso.service');



exports.crearCurso = async (req, res) => {
    const curso = await cursoService.crearCurso(req.body);
    return res.json(curso);
};

exports.mostrarCurso = async (req, res) => {
    const curso = await cursoService.mostrarCursos();
    return res.json(curso);
};


exports.editarCurso = async (req, res) => {
    const curso = await cursoService.editarCurso(req.params.id, req.body);
    return res.json(curso);
};

exports.eliminarCurso = async(req, res) =>{
    const curso = await cursoService.eliminarCurso(req.params.id);
    return res.json(curso);
}