const { CrearCursoDTO, MostrarTodosCursosDTO, MostrarTodosCursosPorIDDTO, EditarCursoDTO } = require('../dto/curso.dto');
const { MostrarUsuarioPorIdDTO } = require('../dto/usuario.dto');
const cursoService = require('../services/curso.service');

exports.crearCurso = async (req, res) => {
    const { error, value: datosValidados } = CrearCursoDTO.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const cursoCreado = await cursoService.crearCurso(datosValidados);
        res.status(201).json(cursoCreado);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el curso' });
    }
};

exports.mostrarCurso = async (req, res) => {
    try {
        const resultado = await cursoService.mostrarCursos();

        // Transformar los documentos a objetos planos
        const cursos = resultado.data.map(curso => curso.toObject());

        // Aplicar el DTO para validar y estructurar la respuesta
        const { error, value } = MostrarTodosCursosDTO.validate(cursos);

        if (error) {
            return res.status(400).json({
                status: 'error',
                mensaje: error.message,
            });
        }

        res.status(200).json({
            status: 'success',
            mensaje: resultado.mensaje,
            data: value, // Datos validados y estructurados por el DTO
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            mensaje: 'Ocurrió un error al mostrar los cursos',
        });
    }
};

exports.mostrarCursoPorId = async (req, res) => {
    try {
        const curso = await cursoService.mostrarCursoPorId(req.params.id);

        if (!curso) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }
        const cursoPlano = curso.data.toObject();
        const { error, value } = MostrarTodosCursosPorIDDTO.validate(cursoPlano);
        if (error) {
            return res.status(400).json({
                status: 'error',
                mensaje: error.message,
            });
        }

        res.status(200).json({
            status: 'success',
            mensaje: curso.mensaje,
            data: value, // Datos validados y estructurados por el DTO
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            mensaje: 'Ocurrió un error al mostrar los cursos',
        });
    }

};

exports.mostrarCursosPorUsuario = async (req, res) => {
    try {
        const curso = await cursoService.mostrarCursosPorUsuario(req.params.id);
        const cursos = curso.data.map(curso => curso.toObject());
        // Aplicar el DTO para validar y estructurar la respuesta
        const { error, value } = MostrarTodosCursosDTO.validate(cursos);

        if (error) {
            return res.status(400).json({
                status: 'error',
                mensaje: error.message,
            });
        }

        res.status(200).json({
            status: 'success',
            mensaje: curso.mensaje,
            data: value, // Datos validados y estructurados por el DTO
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: 'error',
            mensaje: 'Ocurrió un error al mostrar los cursos',
        });
    }
};


exports.editarCurso = async (req, res) => {
    try {
        // Si hay una imagen en el request, añadirla al body
        const imagen = req.file ? req.file.path : null;
        if (imagen) {
            req.body.imagen = imagen;
        }
        
        // Validar los datos usando el DTO
        const { error, value } = EditarCursoDTO.validate(req.body, { abortEarly: false });
    
        if (error) {
            // Si hay errores de validación, devolver un error
            return res.status(400).json({
                status: 'error',
                mensaje: 'Errores de validación',
                errores: error.details.map(detail => detail.message),
            });
        }

        // Llamar al servicio con los datos validados
        const curso = await cursoService.editarCurso(req.params.id, value, value.imagen);

        return res.status(curso.status).json(curso);

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            mensaje: 'Ocurrió un error al editar el curso',
            error: error.message,
        });
    }
};

exports.eliminarCurso = async (req, res) => {
    const curso = await cursoService.eliminarCurso(req.params.id);
    return res.status(curso.status).json(curso);
}