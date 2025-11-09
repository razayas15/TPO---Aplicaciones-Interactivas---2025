// src/dtos/update-task-status.dto.ts

import { IsIn } from 'class-validator';

export class UpdateTaskStatusDto {
    @IsIn(['Pendiente', 'En curso', 'Finalizada', 'Cancelada'], 
          { message: 'Estado inválido. Valores permitidos: Pendiente, En curso, Finalizada, Cancelada.' })
    estado!: 'Pendiente' | 'En curso' | 'Finalizada' | 'Cancelada';
}