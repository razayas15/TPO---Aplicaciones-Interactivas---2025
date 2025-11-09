// src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
// Si no usas jsonwebtoken, debes instalarlo: npm install jsonwebtoken
import * as jwt from 'jsonwebtoken'; 

// Extender la interfaz Request de Express para incluir el objeto 'user'
interface CustomRequest extends Request {
    user?: { id: number; rol?: string; }; 
}

// Clave secreta, idealmente se obtiene de process.env
const JWT_SECRET = 'TU_SECRETO_SEGURO_AQUI'; 

export async function authMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // 1. Verificar y decodificar el token
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; [key: string]: any; };
        
        // 2. Adjuntar los datos del usuario a la solicitud (CRÍTICO)
        // Esto permite al controlador acceder a (req as any).user.id
        req.user = { id: decoded.userId }; 

        // Opcional: Podrías buscar el usuario completo en la DB aquí para asegurar que exista
        
        next();
    } catch (error) {
        // Manejar tokens expirados o inválidos
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
}