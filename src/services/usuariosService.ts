// src/services/usuariosService.ts
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../entities/Usuario';
import { CreateUserDto, LoginUserDto } from '../dtos/user.dtos'; 
import { AppDataSource } from '../data-source'; // Asume la configuración de tu conexión a DB

// Usamos una clase para encapsular los métodos de negocio
class UsuariosService {
    private repo: Repository<Usuario>;

    constructor() {
        // Inicializa el repositorio para interactuar con la tabla 'usuarios'
        this.repo = AppDataSource.getRepository(Usuario);
    }

    /** Lógica de Registro (Sign-up) **/
    async registrar(userData: CreateUserDto): Promise<Usuario> {
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
    async validarCredenciales(email: string, pass: string): Promise<Usuario | null> {
        const user = await this.repo.findOne({ where: { email } });
        
        if (user && await bcrypt.compare(pass, user.password)) {
            // Devuelve el objeto Usuario si las credenciales son válidas
            return user;
        }
        // Devuelve null si no se encuentra o la contraseña no coincide
        return null;
    }
    
    // Método auxiliar para buscar un usuario (útil para perfiles o JWT)
    async findById(id: number): Promise<Usuario | null> {
        return this.repo.findOne({ where: { id } });
    }
}

export const usuariosService = new UsuariosService();