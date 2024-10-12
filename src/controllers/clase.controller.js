const claseService = require('../services/clase.service');

exports.crearClase = async (req, res) => {
    const clase = await claseService.crearClase(req.body);
    return res.json(clase);
};

exports.eliminarClase = async(req, res) =>{
    const clase = await claseService.eliminarClase(req.params.id);
    return res.json(clase);
}

exports.editarClase = async (req, res) => {
    //const documentos = req.file ? req.file.path : null;
    console.log("Estoy entrando aqui")
    const documentos = req.files ? req.files.map(file => file.path) : [];
    const clase = await claseService.editarClase(req.params.id, req.body, documentos);
    return res.json(clase);
};
exports.mostrarClasePorId = async (req, res) => {
    const clase = await claseService.mostrarClasePorId(req.params.id);
    return res.json(clase);
};