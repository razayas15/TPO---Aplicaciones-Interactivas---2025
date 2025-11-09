// src/dtos/user.dtos.ts - CORREGIDO

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// DTO para Registro
export class CreateUserDto {
    @IsEmail({}, { message: 'El correo debe ser una dirección válida.' })
    email!: string; // ¡CORRECCIÓN!

    @IsString()
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    nombre!: string; // ¡CORRECCIÓN!

    @IsString()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    password!: string; // ¡CORRECCIÓN!
}

// DTO para Login
export class LoginUserDto {
    @IsEmail({}, { message: 'Formato de correo inválido.' })
    email!: string; // ¡CORRECCIÓN!

    @IsString()
    @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
    password!: string; // ¡CORRECCIÓN!
}