// src/routes/equipoRoutes.ts

import { Router } from 'express';
import { equiposController } from '../controllers/equiposController';
import { validateDtoMiddleware } from '../middlewares/validateDto'; 
import { authMiddleware } from '../middlewares/authMiddleware'; 
import { CreateTeamDto } from '../dtos/create-team.dto'; 
import { AddMemberDto } from '../dtos/add-member.dto';
import { RemoveMemberDto } from '../dtos/remove-member.dto'; 
import { UpdateRoleDto } from '../dtos/update-role.dto';

const router = Router();

router.use(authMiddleware); 

// POST /api/equipos - Crear equipo
router.post('/', validateDtoMiddleware(CreateTeamDto), equiposController.crearEquipo); 

// DELETE /api/equipos/:id - Eliminar equipo
router.delete('/:id', equiposController.eliminarEquipo);

// POST /api/equipos/:id/members - Añadir miembro
router.post('/:id/members', validateDtoMiddleware(AddMemberDto), equiposController.agregarMiembro);

// DELETE /api/equipos/:id/members - Remover miembro
router.delete('/:id/members', validateDtoMiddleware(RemoveMemberDto), equiposController.removerMiembro);

// Aquí faltarían las rutas GET para listar equipos del usuario y ver detalles del equipo

router.patch(
    '/:id/role', 
    validateDtoMiddleware(UpdateRoleDto), 
    equiposController.actualizarRol
);

export default router;