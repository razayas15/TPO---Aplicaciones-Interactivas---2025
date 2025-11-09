// src/entities/Actividad.ts - CORRECCIÓN FINAL

import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    JoinColumn, 
    CreateDateColumn 
} from "typeorm";
// Asegúrate de que todas las dependencias estén importadas:
import { Tarea } from "./Tarea";
import { Usuario } from "./Usuario";
import { Equipo } from "./Equipo";

@Entity({ name: "actividades" })
export class Actividad {
    @PrimaryGeneratedColumn() // <-- ¡DEBE EXISTIR!
    id!: number;

    // --- Relación con Tarea (Unidireccional - OK) ---
    @ManyToOne(() => Tarea) 
    @JoinColumn({ name: 'tareaId' })
    tarea!: Tarea;
    @Column()
    tareaId!: number;

    // --- Relación con Usuario (Eliminar Bidireccionalidad) ---
    // ANTES: @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.actividades)
    // DESPUÉS: Quitar la función inversa
    @ManyToOne(() => Usuario) 
    @JoinColumn({ name: "usuarioId" })
    usuario!: Usuario;
    @Column()
    usuarioId!: number;
    
    // ...
}