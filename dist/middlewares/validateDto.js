"use strict";
// src/middlewares/validateDto.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDtoMiddleware = validateDtoMiddleware;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
// Función de alto orden que acepta la clase DTO a validar
function validateDtoMiddleware(dtoClass) {
    return async (req, res, next) => {
        // 1. Transformar el objeto plano (req.body) en una instancia de la clase DTO
        const dtoInstance = (0, class_transformer_1.plainToInstance)(dtoClass, req.body);
        // 2. Ejecutar la validación
        const errors = await (0, class_validator_1.validate)(dtoInstance);
        if (errors.length > 0) {
            // 3. Si hay errores, devolver una respuesta 400 Bad Request
            const errorMessages = errors.flatMap(err => err.constraints ? Object.values(err.constraints) : []);
            return res.status(400).json({
                message: 'Error de validación de datos',
                errors: errorMessages,
            });
        }
        // 4. Si es válido, continuar al siguiente middleware o controlador
        next();
    };
}
