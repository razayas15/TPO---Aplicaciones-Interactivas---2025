"use strict";
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
exports.usuariosService = void 0;
const bcrypt = __importStar(require("bcrypt"));
const Usuario_1 = require("../entities/Usuario");
const data_source_1 = require("../data-source"); // Asume la configuración de tu conexión a DB
// Usamos una clase para encapsular los métodos de negocio
class UsuariosService {
    constructor() {
        // Inicializa el repositorio para interactuar con la tabla 'usuarios'
        this.repo = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
    }
    /** Lógica de Registro (Sign-up) **/
    async registrar(userData) {
        // 1. Regla de Negocio: Verificar si el email ya está en uso
        const existingUser = await this.repo.findOne({ where: { email: userData.email } });
        if (existingUser) {
            // Lanza una excepción con código 400 que será capturada por el Controlador
            throw { status: 400, message: 'El correo electrónico ya está registrado.' };
        }
        // 2. Seguridad: Hashear la contraseña (Lógica Crítica)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        // 3. Crear y guardar el nuevo usuario en la base de datos
        const nuevoUsuario = this.repo.create({
            nombre: userData.nombre,
            email: userData.email,
            password: hashedPassword,
        });
        return this.repo.save(nuevoUsuario);
    }
    /** Lógica de Validación de Credenciales (Login) **/
    async validarCredenciales(email, pass) {
        const user = await this.repo.findOne({ where: { email } });
        if (user && await bcrypt.compare(pass, user.password)) {
            // Devuelve el objeto Usuario si las credenciales son válidas
            return user;
        }
        // Devuelve null si no se encuentra o la contraseña no coincide
        return null;
    }
    // Método auxiliar para buscar un usuario (útil para perfiles o JWT)
    async findById(id) {
        return this.repo.findOne({ where: { id } });
    }
}
exports.usuariosService = new UsuariosService();
