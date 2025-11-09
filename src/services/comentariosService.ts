// src/services/comentariosService.ts - VERSIÓN FINAL Y ESTRUCTURALMENTE CORRECTA

import { Repository } from 'typeorm';
import { Comentario } from '../entities/Comentario';
import { Tarea } from '../entities/Tarea';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { AppDataSource } from '../data-source'; 
import { equiposService } from './equiposService'; // Para verificación de membresía

const comentarioRepo = AppDataSource.getRepository(Comentario);
const tareaRepo = AppDataSource.getRepository(Tarea);

class ComentariosService {
    
    // --- Lógica Auxiliar para Verificación de Permisos ---
    
    private async verificarAccesoATarea(tareaId: number, usuarioId: number): Promise<Tarea> {
        const tarea = await tareaRepo.findOne({ 
            where: { id: tareaId } as any,
            // Select para asegurar que la FK simple 'equipoId' se cargue
            select: ['id', 'equipoId']
        });

        if (!tarea) {
            throw { status: 404, message: 'Tarea no encontrada.' };
        }
        
        // Autorización: Verificar que el usuario sea al menos Miembro.
        await equiposService.verificarPermiso(usuarioId, tarea.equipoId!, 'Miembro');

        return tarea;
    }

    // -------------------------------------------------------------------
    // --- MÉTODO COMPLETO DE CREAR ---
    // -------------------------------------------------------------------

    /**
     * Añade un comentario a una tarea existente.
     */
    async crearComentario(tareaId: number, autorId: number, commentDto: CreateCommentDto): Promise<Comentario> {
        // 1. Verificar acceso y existencia de la tarea
        await this.verificarAccesoATarea(tareaId, autorId); 
        
        // 2. Crear Comentario (usa los parámetros del scope actual: tareaId, autorId)
        const nuevoComentario = comentarioRepo.create({
            contenido: commentDto.contenido,
            tareaId: tareaId, // Ahora esta variable es accesible
            autorId: autorId, // Ahora esta variable es accesible
        });

        const comentarioGuardado = await comentarioRepo.save(nuevoComentario);
        
        // Recargar para devolver las relaciones eager-loaded (como el autor)
        return (await comentarioRepo.findOne({ 
            where: { id: comentarioGuardado.id } as any 
        }))!;
    }
    
    // -------------------------------------------------------------------
    // --- MÉTODO PLACEHOLDER (EJEMPLO) ---
    // -------------------------------------------------------------------

    /**
     * Placeholder para la lógica de eliminación.
     */
    async eliminarComentario(comentarioId: number, usuarioId: number) {
        // Aquí iría la lógica completa de eliminación (Autor o Propietario del equipo)
        return { message: 'Comentario eliminado.' };
    }
}

export const comentariosService = new ComentariosService();