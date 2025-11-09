// src/routes/comentariosRoutes.ts

import { Router } from 'express';
import { comentariosController } from '../controllers/comentariosController';
import { validateDtoMiddleware } from '../middlewares/validateDto'; 
import { authMiddleware } from '../middlewares/authMiddleware'; 
import { CreateCommentDto } from '../dtos/create-comment.dto'; 

const router = Router();

// Todas las rutas de comentarios requieren autenticación
router.use(authMiddleware); 

// POST /api/tareas/:tareaId/comentarios - Crear un comentario
router.post(
    '/:tareaId/comentarios', 
    validateDtoMiddleware(CreateCommentDto),
    comentariosController.crearComentario
); 

// Nota: Estas rutas deben montarse en el router principal bajo /api/tareas
// En tu index.ts o app.ts: app.use('/api/tareas', comentariosRoutes);

export default router;