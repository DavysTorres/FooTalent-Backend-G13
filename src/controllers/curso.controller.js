const cursoService = require('../services/curso.service');

exports.crearCurso = async (req, res) => {
    const curso = await cursoService.crearCurso(req.body);
    return res.status(curso.status).json(curso);
};

exports.mostrarCurso = async (req, res) => {
    const curso = await cursoService.mostrarCursos();
    return res.status(curso.status).json(curso);
};

exports.mostrarCursoPorId = async (req, res) => {
    const curso = await cursoService.mostrarCursoPorId(req.params.id);
    return res.status(curso.status).json(curso);
};

exports.mostrarCursosPorUsuario = async (req, res) => {
    const curso = await cursoService.mostrarCursosPorUsuario(req.params.id);
    return res.status(curso.status).json(curso);
};


exports.editarCurso = async (req, res) => {
    const imagen = req.file ? req.file.path : null;
    const curso = await cursoService.editarCurso(req.params.id, req.body, imagen);
    return res.status(curso.status).json(curso);
};

exports.eliminarCurso = async(req, res) =>{
    const curso = await cursoService.eliminarCurso(req.params.id);
    return res.status(curso.status).json(curso);
}