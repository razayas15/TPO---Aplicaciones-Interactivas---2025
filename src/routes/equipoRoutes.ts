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
router.post('/', validateDtoMiddleware(CreateTeamDto), equiposController.crearEquipo); 
router.delete('/:id', equiposController.eliminarEquipo);
router.post('/:id/members', validateDtoMiddleware(AddMemberDto), equiposController.agregarMiembro);
router.delete('/:id/members', validateDtoMiddleware(RemoveMemberDto), equiposController.removerMiembro);
router.patch('/:id/role', validateDtoMiddleware(UpdateRoleDto), equiposController.actualizarRol);
router.get('/', equiposController.listarEquiposPorUsuario);
router.get('/:id', equiposController.obtenerEquipoPorId);

export default router;