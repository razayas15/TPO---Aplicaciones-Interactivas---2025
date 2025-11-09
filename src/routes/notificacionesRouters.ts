// src/routes/notificacionesRoutes.ts

import { Router } from 'express';
import { notificacionesController } from '../controllers/notificacionesController';
import { authMiddleware } from '../middlewares/authMiddleware'; 
// import { validateDtoMiddleware } from '../middlewares/validateDto'; 

const router = Router();

router.use(authMiddleware); 

// GET /api/notificaciones - Listar notificaciones del usuario
router.get(
    '/', 
    notificacionesController.obtener
); 

// PATCH /api/notificaciones/read - Marcar como leídas (Recibe { ids: [1, 2, 3] })
router.patch(
    '/read', 
    // validateDtoMiddleware(MarkAsReadDto), // Se puede hacer validación manual de IDs en el controlador
    notificacionesController.marcarLeidas
); 

export default router;