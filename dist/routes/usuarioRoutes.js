"use strict";
// src/routes/usuarioRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
// Asume que tienes un middleware para validar DTOs (necesario para el DTO)
const validateDto_1 = require("../middlewares/validateDto");
const user_dtos_1 = require("../dtos/user.dtos");
const router = (0, express_1.Router)();
// Endpoint de Registro: POST /api/usuarios/signup
router.post('/signup', (0, validateDto_1.validateDtoMiddleware)(user_dtos_1.CreateUserDto), // Valida DTO antes del Controller
usuariosController_1.usuariosController.registrar);
// Endpoint de Login: POST /api/usuarios/login
router.post('/login', (0, validateDto_1.validateDtoMiddleware)(user_dtos_1.LoginUserDto), // Valida DTO antes del Controller
usuariosController_1.usuariosController.login);
exports.default = router;
