// src/controllers/actividadesController.ts

import { Request, Response, NextFunction } from 'express';
import { actividadesService } from '../services/actividadesService';

export class ActividadesController {
    
    // Función auxiliar para manejar errores de forma consistente
    private handleServiceError(res: Response, error: unknown) {
        const customError = error as { status?: number; message?: string }; 
        const status = customError.status || 500;
        return res.status(status).json({ message: customError.message || 'Error interno del servidor.' });
    }

    /** GET /tareas/:tareaId/actividad - Obtener historial (R) **/
    async obtenerHistorial(req: Request, res: Response, next: NextFunction) {
        try {
            const tareaId = parseInt(req.params.tareaId);
            const usuarioId = (req as any).user.id; 
            
            // Delegar la lógica al servicio
            const historial = await actividadesService.obtenerHistorialPorTarea(tareaId, usuarioId);
            
            return res.status(200).json(historial); 
            
        } catch (error) {
            return this.handleServiceError(res, error);
        }
    }
}

export const actividadesController = new ActividadesController(); // ¡Exportación clave!