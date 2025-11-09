"use strict";
// src/routes/equipoRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const equiposController_1 = require("../controllers/equiposController");
const validateDto_1 = require("../middlewares/validateDto");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Asumimos un middleware de JWT
const create_team_dto_1 = require("../dtos/create-team.dto");
const router = (0, express_1.Router)();
// Todas estas rutas deben estar protegidas por autenticación
router.use(authMiddleware_1.authMiddleware);
// POST /api/equipos - Crear equipo (el creador se asigna como Propietario)
router.post('/', (0, validateDto_1.validateDtoMiddleware)(create_team_dto_1.CreateTeamDto), equiposController_1.equiposController.crearEquipo);
// DELETE /api/equipos/:id - Eliminar equipo
router.delete('/:id', equiposController_1.equiposController.eliminarEquipo // El controlador valida que solo el Propietario pueda hacerlo
);
// Aquí irán las rutas GET, PATCH, y las de gestión de miembros (/api/equipos/:id/members)
exports.default = router;
