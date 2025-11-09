// src/routes/usuarioRoutes.ts

import { Router } from 'express';
import { usuariosController } from '../controllers/usuariosController';
// Asume que tienes un middleware para validar DTOs (necesario para el DTO)
import { validateDtoMiddleware } from '../middlewares/validateDto'; 
import { CreateUserDto, LoginUserDto } from '../dtos/user.dtos'; 

const router = Router();

// Endpoint de Registro: POST /api/usuarios/signup
router.post(
    '/signup', 
    validateDtoMiddleware(CreateUserDto), // Valida DTO antes del Controller
    usuariosController.registrar
); 

// Endpoint de Login: POST /api/usuarios/login
router.post(
    '/login', 
    validateDtoMiddleware(LoginUserDto), // Valida DTO antes del Controller
    usuariosController.login
);

export default router;