// src/dtos/mark-as-read.dto.ts

import { IsBoolean, IsNotEmpty } from 'class-validator';

export class MarkAsReadDto {
    @IsBoolean()
    @IsNotEmpty({ message: 'El estado de lectura es obligatorio.' })
    leida!: boolean; // Siempre se enviará 'true'
}