// src/controllers/comentariosController.ts

import { Request, Response, NextFunction } from 'express';
import { comentariosService } from '../services/comentariosService';
import { CreateCommentDto } from '../dtos/create-comment.dto';

export class ComentariosController {
    
    private handleServiceError(res: Response, error: unknown) {
        const customError = error as { status?: number; message?: string }; 
        const status = customError.status || 500;
        return res.status(status).json({ message: customError.message || 'Error interno del servidor.' });
    }

    /** POST /tareas/:tareaId/comentarios - Añadir comentario **/
    async crearComentario(req: Request, res: Response, next: NextFunction) {
        try {
            const tareaId = parseInt(req.params.tareaId);
            const autorId = (req as any).user.id; 
            const commentDto: CreateCommentDto = req.body;
            
            const comentario = await comentariosService.crearComentario(tareaId, autorId, commentDto);
            return res.status(201).json(comentario); 
            
        } catch (error) {
            return this.handleServiceError(res, error);
        }
    }
    
    // Aquí iría el método para eliminar comentario
}

export const comentariosController = new ComentariosController();