"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarTarea = exports.cambiarEstadoTarea = exports.editarTarea = exports.getTareaDetalle = exports.getTareas = exports.crearTarea = void 0;
const data_source_1 = require("../data-source");
const Tarea_1 = require("../entities/Tarea");
const tareaRepo = data_source_1.AppDataSource.getRepository(Tarea_1.Tarea);
// Crear tarea con validaciones
const crearTarea = async (req, res) => {
    try {
        const { titulo, descripcion, fecha_vencimiento, creador_id, equipo_id } = req.body;
        // Validar campos obligatorios
        if (!titulo || !creador_id || !equipo_id) {
            return res.status(400).json({
                message: "Faltan datos obligatorios: titulo, creador_id y equipo_id son requeridos.",
            });
        }
        const nuevaTarea = tareaRepo.create({
            id,
            titulo,
            descripcion,
            estado: "PENDIENTE",
            prioridad: 1,
            fecha_vencimiento,
            creador_id,
            equipo_id,
        });
        const tareaGuardada = await tareaRepo.save(nuevaTarea);
        res.status(201).json(tareaGuardada);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear tarea", error });
    }
};
exports.crearTarea = crearTarea;
// Listar todas las tareas
const getTareas = async (req, res) => {
    try {
        const tareas = await tareaRepo.find();
        res.json(tareas);
    }
    catch (error) {
        res.status(500).json({ message: "Error al listar tareas", error });
    }
};
exports.getTareas = getTareas;
// Obtener detalle de tarea por id
const getTareaDetalle = async (req, res) => {
    try {
        const { id } = req.params;
        const tarea = await tareaRepo.findOneBy({ id: parseInt(id) });
        if (!tarea) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        res.json(tarea);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener tarea", error });
    }
};
exports.getTareaDetalle = getTareaDetalle;
// Editar una tarea completa
const editarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, prioridad, fecha_vencimiento } = req.body;
        const tarea = await tareaRepo.findOneBy({ id: parseInt(id) });
        if (!tarea) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        tarea.titulo = titulo ?? tarea.titulo;
        tarea.descripcion = descripcion ?? tarea.descripcion;
        tarea.prioridad = prioridad ?? tarea.prioridad;
        tarea.fecha_vencimiento = fecha_vencimiento ?? tarea.fecha_vencimiento;
        tarea.actualizado_en = new Date().toISOString();
        await tareaRepo.save(tarea);
        res.json({ message: "Tarea actualizada correctamente", tarea });
    }
    catch (error) {
        res.status(500).json({ message: "Error al editar tarea", error });
    }
};
exports.editarTarea = editarTarea;
// Cambiar estado de la tarea
const cambiarEstadoTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const { nuevoEstado } = req.body;
        const tarea = await tareaRepo.findOneBy({ id: parseInt(id) });
        if (!tarea) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        tarea.estado = nuevoEstado;
        tarea.actualizado_en = new Date().toISOString();
        await tareaRepo.save(tarea);
        res.json({ message: `Estado de la tarea cambiado a ${nuevoEstado}`, tarea });
    }
    catch (error) {
        res.status(500).json({ message: "Error al cambiar estado de tarea", error });
    }
};
exports.cambiarEstadoTarea = cambiarEstadoTarea;
// Borrar tarea
const borrarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const tarea = await tareaRepo.findOneBy({ id: parseInt(id) });
        if (!tarea) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        await tareaRepo.remove(tarea);
        res.json({ message: "Tarea eliminada correctamente" });
    }
    catch (error) {
        res.status(500).json({ message: "Error al borrar tarea", error });
    }
};
exports.borrarTarea = borrarTarea;
