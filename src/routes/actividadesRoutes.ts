// src/routes/actividadesRoutes.ts

import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { ActividadesController } from '../controllers/actividadesController'; 
export const actividadesController = new ActividadesController(); // <--- ¡Esto es lo que el router necesita!

const router = Router();

router.use(authMiddleware); 

// GET /api/tareas/:tareaId/actividad - Obtener el historial de una tarea
router.get(
    '/:tareaId/actividad', 
    actividadesController.obtenerHistorial
); 

// Nota: Estas rutas deben montarse en el router principal bajo /api/tareas
// En tu index.ts o app.ts: app.use('/api/tareas', actividadesRoutes);

export default router;