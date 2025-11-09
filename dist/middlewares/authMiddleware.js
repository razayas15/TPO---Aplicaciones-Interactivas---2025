"use strict";
// src/middlewares/authMiddleware.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
// Si no usas jsonwebtoken, debes instalarlo: npm install jsonwebtoken
const jwt = __importStar(require("jsonwebtoken"));
// Clave secreta, idealmente se obtiene de process.env
const JWT_SECRET = 'TU_SECRETO_SEGURO_AQUI';
async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        // 1. Verificar y decodificar el token
        const decoded = jwt.verify(token, JWT_SECRET);
        // 2. Adjuntar los datos del usuario a la solicitud (CRÍTICO)
        // Esto permite al controlador acceder a (req as any).user.id
        req.user = { id: decoded.userId };
        // Opcional: Podrías buscar el usuario completo en la DB aquí para asegurar que exista
        next();
    }
    catch (error) {
        // Manejar tokens expirados o inválidos
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
}
