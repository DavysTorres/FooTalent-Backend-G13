const claseService = require('../services/clase.service');

exports.crearClase = async (req, res) => {
    const clase = await claseService.crearClase(req.body);
    return res.json(clase);
};

exports.eliminarClase = async(req, res) =>{
    const clase = await claseService.eliminarClase(req.params.id);
    console.log("ID:"+req.params.id)
    return res.json(clase);
}

exports.editarClase = async (req, res) => {
    //const imagen = req.file ? req.file.path : null;
    const clase = await claseService.editarClase(req.params.id, req.body);
    return res.json(clase);
};
exports.mostrarClasePorId = async (req, res) => {
    const clase = await claseService.mostrarClasePorId(req.params.id);
    return res.json(clase);
};