// src/dtos/update-role.dto.ts

import { IsEmail, IsIn } from 'class-validator';

export class UpdateRoleDto {
    @IsEmail({}, { message: 'Debe ser un correo electrónico válido.' })
    email!: string;

    @IsIn(['Propietario', 'Miembro'], { message: 'El rol solo puede ser Propietario o Miembro.' })
    rol!: 'Propietario' | 'Miembro';
}