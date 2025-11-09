"use strict";
// src/controllers/equiposController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.equiposController = exports.EquiposController = void 0;
const equiposService_1 = require("../services/equiposService");
class EquiposController {
    /** POST /equipos - Crear un nuevo equipo **/
    async crearEquipo(req, res, next) {
        try {
            // Asumimos que el ID del usuario está en req.user después de la autenticación JWT
            const creadorId = req.user.id;
            const teamDto = req.body;
            const equipo = await equiposService_1.equiposService.crearEquipo(teamDto, creadorId);
            return res.status(201).json(equipo);
        }
        catch (error) {
            const status = error.status || 500;
            return res.status(status).json({ message: error.message });
        }
    }
    /** DELETE /equipos/:id - Eliminar un equipo **/
    async eliminarEquipo(req, res, next) {
        try {
            const equipoId = parseInt(req.params.id);
            const usuarioId = req.user.id;
            // 1. Verificar Permiso: Solo el Propietario puede eliminar
            await equiposService_1.equiposService.verificarPermiso(usuarioId, equipoId, 'Propietario');
            // 2. Eliminar (la lógica de negocio de chequeo de tareas está en el servicio)
            const resultado = await equiposService_1.equiposService.eliminarEquipo(equipoId);
            // 3. Respuesta: 200 OK
            return res.status(200).json(resultado);
        }
        catch (error) {
            const status = error.status || 500;
            return res.status(status).json({ message: error.message });
        }
    }
}
exports.EquiposController = EquiposController;
exports.equiposController = new EquiposController();
