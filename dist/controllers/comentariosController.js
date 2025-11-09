"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComentariosController = void 0;
const data_source_1 = require("../data-source");
const Comentario_1 = require("../entities/Comentario");
const Tarea_1 = require("../entities/Tarea");
const Membresia_1 = require("../entities/Membresia");
const Actividad_1 = require("../entities/Actividad");
const comentarioRepository = data_source_1.AppDataSource.getRepository(Comentario_1.Comentario);
const tareaRepository = data_source_1.AppDataSource.getRepository(Tarea_1.Tarea);
const membresiaRepository = data_source_1.AppDataSource.getRepository(Membresia_1.Membresia);
const actividadRepository = data_source_1.AppDataSource.getRepository(Actividad_1.Actividad);
class ComentariosController {
    // GET /api/tareas/:tareaId/comentarios - Listar comentarios de una tarea
    static async listarComentarios(req, res) {
        try {
            const { tareaId } = req.params;
            const usuarioId = req.usuario?.id;
            if (!usuarioId) {
                return res.status(401).json({ error: 'No autenticado' });
            }
            // Verificar que la tarea existe
            const tarea = await tareaRepository.findOne({
                where: { id: parseInt(tareaId) },
                relations: ['equipo', 'creadoPor']
            });
            if (!tarea) {
                return res.status(404).json({ error: 'Tarea no encontrada' });
            }
            // Verificar permisos: debe ser miembro del equipo o creador de tarea personal
            if (tarea.equipoId) {
                const membresia = await membresiaRepository.findOne({
                    where: {
                        equipoId: tarea.equipoId,
                        usuarioId: usuarioId,
                        estado: 'aceptada'
                    }
                });
                if (!membresia) {
                    return res.status(403).json({
                        error: 'No tienes acceso a los comentarios de esta tarea'
                    });
                }
            }
            else {
                // Tarea personal: solo el creador puede ver comentarios
                if (tarea.creadoPorId !== usuarioId) {
                    return res.status(403).json({
                        error: 'No tienes acceso a los comentarios de esta tarea'
                    });
                }
            }
            // Obtener comentarios ordenados por fecha
            const comentarios = await comentarioRepository.find({
                where: { tareaId: parseInt(tareaId) },
                order: { fechaCreacion: 'ASC' },
                relations: ['autor']
            });
            res.json(comentarios.map(c => c.toJSON()));
        }
        catch (error) {
            console.error('Error al listar comentarios:', error);
            res.status(500).json({ error: 'Error al listar comentarios' });
        }
    }
    // POST /api/tareas/:tareaId/comentarios - Crear comentario
    static async crearComentario(req, res) {
        try {
            const { tareaId } = req.params;
            const { contenido } = req.body;
            const usuarioId = req.usuario?.id;
            if (!usuarioId) {
                return res.status(401).json({ error: 'No autenticado' });
            }
            // Validaciones
            if (!contenido || contenido.trim().length === 0) {
                return res.status(400).json({
                    error: 'El contenido del comentario es requerido'
                });
            }
            if (contenido.length > 2000) {
                return res.status(400).json({
                    error: 'El comentario no puede exceder 2000 caracteres'
                });
            }
            // Verificar que la tarea existe
            const tarea = await tareaRepository.findOne({
                where: { id: parseInt(tareaId) },
                relations: ['equipo', 'creadoPor']
            });
            if (!tarea) {
                return res.status(404).json({ error: 'Tarea no encontrada' });
            }
            // Verificar permisos: debe ser miembro del equipo o creador de tarea personal
            if (tarea.equipoId) {
                const membresia = await membresiaRepository.findOne({
                    where: {
                        equipoId: tarea.equipoId,
                        usuarioId: usuarioId,
                        estado: 'aceptada'
                    }
                });
                if (!membresia) {
                    return res.status(403).json({
                        error: 'No tienes permiso para comentar en esta tarea'
                    });
                }
            }
            else {
                // Tarea personal: solo el creador puede comentar
                if (tarea.creadoPorId !== usuarioId) {
                    return res.status(403).json({
                        error: 'No tienes permiso para comentar en esta tarea'
                    });
                }
            }
            // Crear comentario
            const comentario = comentarioRepository.create({
                contenido: contenido.trim(),
                tareaId: parseInt(tareaId),
                autorId: usuarioId
            });
            await comentarioRepository.save(comentario);
            // Registrar actividad
            const actividad = actividadRepository.create({
                tareaId: parseInt(tareaId),
                usuarioId: usuarioId,
                tipo: 'comentario',
                descripcion: `agregó un comentario: "${contenido.substring(0, 50)}${contenido.length > 50 ? '...' : ''}"`
            });
            await actividadRepository.save(actividad);
            // Recargar con relaciones para devolver datos completos
            const comentarioCompleto = await comentarioRepository.findOne({
                where: { id: comentario.id },
                relations: ['autor']
            });
            res.status(201).json(comentarioCompleto?.toJSON());
        }
        catch (error) {
            console.error('Error al crear comentario:', error);
            res.status(500).json({ error: 'Error al crear comentario' });
        }
    }
    // PUT /api/tareas/:tareaId/comentarios/:id - Editar comentario
    static async editarComentario(req, res) {
        try {
            const { tareaId, id } = req.params;
            const { contenido } = req.body;
            const usuarioId = req.usuario?.id;
            if (!usuarioId) {
                return res.status(401).json({ error: 'No autenticado' });
            }
            // Validaciones
            if (!contenido || contenido.trim().length === 0) {
                return res.status(400).json({
                    error: 'El contenido del comentario es requerido'
                });
            }
            if (contenido.length > 2000) {
                return res.status(400).json({
                    error: 'El comentario no puede exceder 2000 caracteres'
                });
            }
            // Buscar comentario
            const comentario = await comentarioRepository.findOne({
                where: {
                    id: parseInt(id),
                    tareaId: parseInt(tareaId)
                },
                relations: ['autor']
            });
            if (!comentario) {
                return res.status(404).json({ error: 'Comentario no encontrado' });
            }
            // Solo el autor puede editar su comentario
            if (comentario.autorId !== usuarioId) {
                return res.status(403).json({
                    error: 'Solo puedes editar tus propios comentarios'
                });
            }
            // Actualizar
            comentario.contenido = contenido.trim();
            await comentarioRepository.save(comentario);
            res.json(comentario.toJSON());
        }
        catch (error) {
            console.error('Error al editar comentario:', error);
            res.status(500).json({ error: 'Error al editar comentario' });
        }
    }
    // DELETE /api/tareas/:tareaId/comentarios/:id - Eliminar comentario
    static async eliminarComentario(req, res) {
        try {
            const { tareaId, id } = req.params;
            const usuarioId = req.usuario?.id;
            if (!usuarioId) {
                return res.status(401).json({ error: 'No autenticado' });
            }
            // Buscar comentario
            const comentario = await comentarioRepository.findOne({
                where: {
                    id: parseInt(id),
                    tareaId: parseInt(tareaId)
                }
            });
            if (!comentario) {
                return res.status(404).json({ error: 'Comentario no encontrado' });
            }
            // Buscar tarea para verificar permisos
            const tarea = await tareaRepository.findOne({
                where: { id: parseInt(tareaId) },
                relations: ['equipo']
            });
            if (!tarea) {
                return res.status(404).json({ error: 'Tarea no encontrada' });
            }
            // Puede eliminar: el autor del comentario o el propietario del equipo
            let puedeEliminar = comentario.autorId === usuarioId;
            if (!puedeEliminar && tarea.equipoId) {
                const membresia = await membresiaRepository.findOne({
                    where: {
                        equipoId: tarea.equipoId,
                        usuarioId: usuarioId,
                        rol: 'propietario',
                        estado: 'aceptada'
                    }
                });
                puedeEliminar = !!membresia;
            }
            if (!puedeEliminar) {
                return res.status(403).json({
                    error: 'No tienes permiso para eliminar este comentario'
                });
            }
            await comentarioRepository.remove(comentario);
            res.json({ mensaje: 'Comentario eliminado exitosamente' });
        }
        catch (error) {
            console.error('Error al eliminar comentario:', error);
            res.status(500).json({ error: 'Error al eliminar comentario' });
        }
    }
}
exports.ComentariosController = ComentariosController;
