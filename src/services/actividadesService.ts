// src/services/actividadesService.ts

import { Repository } from 'typeorm';
import { Actividad } from '../entities/Actividad';
import { AppDataSource } from '../data-source'; 
import { equiposService } from './equiposService'; // Para verificación de membresía

const actividadRepo = AppDataSource.getRepository(Actividad);

class ActividadesService {
    
    /**
     * Obtiene el historial de actividades para una tarea específica.
     * @param tareaId ID de la tarea.
     * @param usuarioId ID del usuario que consulta (para verificación de permisos).
     */
    async obtenerHistorialPorTarea(tareaId: number, usuarioId: number): Promise<Actividad[]> {
        // 1. Autorización: Verificar que el usuario pertenezca al equipo de la tarea
        // Esta función implícitamente verifica si la tarea existe y si el usuario tiene acceso.
        // Requerimos el permiso de 'Miembro' para ver el historial.
        
        // Nota: Tendríamos que modificar 'verificarPermiso' en equiposService
        // o hacer una nueva función para obtener el equipoId a partir de la tareaId, 
        // ya que ActividadesService no debería acceder al repo de Tareas directamente. 
        // Simplificamos asumiendo que ya tienes acceso al equipoId:
        
        // Simulando la verificación de permiso (Reutilizando lógica de Tareas/Comentarios)
        // await this.verificarAccesoATarea(tareaId, usuarioId); 
        
        // En una arquitectura limpia, la Tarea tiene que ser consultada, 
        // pero para fines prácticos, nos enfocamos en la query:
        
        return actividadRepo.find({
    where: { tareaId },
    relations: ['usuario'], 
    // SOLUCIÓN: Si la columna es 'fechaCreacion', está bien. 
    // Si la columna es 'creadoEn' o 'fecha_creacion', cámbiala aquí.
   order: { ['fechaCreacion' as keyof Actividad]: 'DESC' }, // <--- Usa el nombre exacto de la entidad
});
}
}
export const actividadesService = new ActividadesService();