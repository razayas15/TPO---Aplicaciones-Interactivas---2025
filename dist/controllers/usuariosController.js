"use strict";
// src/controllers/usuariosController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosController = exports.UsuariosController = void 0;
const usuariosService_1 = require("../services/usuariosService");
// Importa aquí tu librería para generar JWT (ej. jsonwebtoken)
// import * as jwt from 'jsonwebtoken'; 
class UsuariosController {
    /** POST /signup - Registro de un nuevo usuario **/
    async registrar(req, res, next) {
        try {
            // El DTO ya ha sido validado por el middleware en la ruta
            const userData = req.body;
            // 1. Delegar el registro al Servicio
            const usuario = await usuariosService_1.usuariosService.registrar(userData);
            // 2. Respuesta: 201 Created. Se usa .toJSON() para la seguridad.
            return res.status(201).json(usuario.toJSON());
        }
        catch (error) {
            // Captura errores del Servicio (ej. 400 si el email existe)
            const status = error.status || 500;
            const message = error.message || 'Error interno del servidor al registrar.';
            return res.status(status).json({ message });
        }
    }
    /** POST /login - Inicio de sesión **/
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            // 1. Delegar la validación de credenciales al Servicio
            const user = await usuariosService_1.usuariosService.validarCredenciales(email, password);
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
        }
        catch (error) {
            return res.status(500).json({ message: 'Error interno del servidor.' });
        }
    }
}
exports.UsuariosController = UsuariosController;
exports.usuariosController = new UsuariosController();
