"use strict";
// src/services/equiposService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.equiposService = void 0;
const typeorm_1 = require("typeorm");
const Equipo_1 = require("../entities/Equipo");
const Membresia_1 = require("../entities/Membresia");
const Usuario_1 = require("../entities/Usuario");
const Tarea_1 = require("../entities/Tarea"); // Necesario para la regla de negocio
const data_source_1 = require("../data-source");
class EquiposService {
    constructor() {
        this.equipoRepo = data_source_1.AppDataSource.getRepository(Equipo_1.Equipo);
        this.membresiaRepo = data_source_1.AppDataSource.getRepository(Membresia_1.Membresia);
        this.usuarioRepo = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
    }
    /**
     * Crea un equipo y automáticamente asigna al creador como Propietario.
     * @param teamDto Datos del equipo.
     * @param creadorId ID del usuario que crea el equipo (obtenido del token).
     */
    async crearEquipo(teamDto, creadorId) {
        // 1. Crear el equipo
        const nuevoEquipo = this.equipoRepo.create(teamDto);
        const equipoGuardado = await this.equipoRepo.save(nuevoEquipo);
        // 2. Regla de Negocio: Asignar al creador como 'Propietario'
        const membresia = this.membresiaRepo.create({
            equipoId: equipoGuardado.id,
            usuarioId: creadorId,
            rol: 'Propietario', // Rol por defecto al crear
        });
        await this.membresiaRepo.save(membresia);
        return equipoGuardado;
    }
    /**
     * Valida el permiso de un usuario en un equipo.
     */
    async verificarPermiso(usuarioId, equipoId, rolRequerido) {
        const membresia = await this.membresiaRepo.findOne({
            where: { usuarioId, equipoId },
        });
        if (!membresia) {
            throw { status: 404, message: 'Usuario no es miembro del equipo.' };
        }
        // Para cualquier operación, el miembro puede ser "Miembro" o "Propietario"
        if (rolRequerido === 'Miembro') {
            return membresia;
        }
        // Para operaciones administrativas (eliminar, gestionar miembros), solo "Propietario"
        if (rolRequerido === 'Propietario' && membresia.rol !== 'Propietario') {
            throw { status: 403, message: 'Acceso denegado. Se requiere rol de Propietario.' };
        }
        return membresia;
    }
    /**
     * Elimina un equipo con validación de tareas pendientes.
     * @param equipoId ID del equipo a eliminar.
     */
    async eliminarEquipo(equipoId) {
        // 1. Regla de Negocio: Un equipo no se elimina si tiene tareas Pendientes o En curso (Requisito 6)
        const tareasActivas = await data_source_1.AppDataSource.getRepository(Tarea_1.Tarea).count({
            where: {
                equipo: { id: equipoId },
                estado: (0, typeorm_1.In)(['Pendiente', 'En curso']),
            },
        });
        if (tareasActivas > 0) {
            throw {
                status: 400,
                message: 'No se puede eliminar el equipo: tiene tareas Pendientes o En curso.'
            };
        }
        // 2. Eliminar equipo (y sus membresías por CASCADE)
        const resultado = await this.equipoRepo.delete(equipoId);
        if (resultado.affected === 0) {
            throw { status: 404, message: 'Equipo no encontrado.' };
        }
        return { message: 'Equipo eliminado exitosamente.' };
    }
}
exports.equiposService = new EquiposService();
