// src/controllers/usuariosController.ts

import { Request, Response, NextFunction } from 'express';
import { usuariosService } from '../services/usuariosService';
import { CreateUserDto, LoginUserDto } from '../dtos/user.dtos'; 

// Importa aquí tu librería para generar JWT (ej. jsonwebtoken)
// import * as jwt from 'jsonwebtoken'; 

export class UsuariosController {
    
    /** POST /signup - Registro de un nuevo usuario **/
    // src/controllers/usuariosController.ts (Método registrar)

// ...

    async registrar(req: Request, res: Response, next: NextFunction) {
        try {
            // ... (Lógica de try) ...
            
        } catch (error) {
            
            // SOLUCIÓN: Usar la aserción de tipo para acceder a 'status' y 'message'
            const customError = error as { status?: number; message?: string }; 
            
            // LÍNEA 26 CORREGIDA
            const status = customError.status || 500;
            
            // LÍNEA 27 CORREGIDA
            const message = customError.message || 'Error interno del servidor al registrar.';
            
            return res.status(status).json({ message: message });
        }
    }
// ...

    /** POST /login - Inicio de sesión **/
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body as LoginUserDto;
            
            // 1. Delegar la validación de credenciales al Servicio
            const user = await usuariosService.validarCredenciales(email, password);

            if (!user) {
                // 2. Respuesta: 401 Unauthorized si falla la validación
                return res.status(401).json({ message: 'Credenciales inválidas.' });
            }

            // 3. Generar y firmar el token JWT (Requisito de Autenticación)
            const token = "TOKEN_JWT_GENERADO_AQUI"; 
            // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

            // 4. Respuesta: 200 OK con el token y datos del usuario
            return res.status(200).json({ 
                user: user.toJSON(), 
                token: token,
                message: 'Inicio de sesión exitoso'
            });

        } catch (error) {
            return res.status(500).json({ message: 'Error interno del servidor.' });
        }
    }
}

export const usuariosController = new UsuariosController();