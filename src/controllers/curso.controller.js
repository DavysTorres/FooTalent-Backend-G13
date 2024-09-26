const cursoService = require('../services/curso.service');



exports.crearCurso = async (req, res, next) => {
    const curso = await cursoService.crearCurso(req.body);
    return res.json(curso);
};

exports.mostrarCurso = async (req, res, next) => {
    const curso = await cursoService.mostrarCursos();
    return res.json(curso);
};


exports.editarCurso = async (req, res, next) => {
    const curso = await cursoService.editarCurso(req.params.id, req.body);
    return res.json(curso);
};
