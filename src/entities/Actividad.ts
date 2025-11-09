// src/entities/Actividad.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
// Asegúrate de que todas las dependencias estén importadas:
import { Tarea } from "./Tarea";
import { Usuario } from "./Usuario";
import { Equipo } from "./Equipo";

@Entity({ name: "actividades" }) // Usamos plural para consistencia con tablas (ej: usuarios, equipos)
export class Actividad {
  @PrimaryGeneratedColumn()
  id!: number; // TS2564 fix

  @Column()
  tipo!: string; // Ejemplo: 'CAMBIO_ESTADO', 'COMENTARIO', 'ASIGNACION'

  // Renombrado de 'descripcion' a 'contenido' para ser consistente con la lógica de tareasService
  @Column({ type: "text", nullable: true })
  contenido!: string;

  @Column({ type: "text", nullable: true })
  metadata!: string; // Para almacenar el valor anterior/nuevo (ej: "Prioridad: Alta -> Media")

  @CreateDateColumn() // Estándar para la fecha de creación (mejor que @Column)
  fechaCreacion!: Date; // Usamos Date, consistente con Usuario/Equipo

  // --- Relación con Tarea (Dependencia Obligatoria) ---
  // La actividad registra un evento sobre una Tarea
  @ManyToOne(() => Tarea) 
@JoinColumn({ name: 'tareaId' })
tarea!: Tarea;
@Column()
tareaId!: number;

  // --- Relación con Usuario (Quién realizó la acción) ---
  // Eliminamos 'usuario_id' redundante y usamos esta definición
  @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.actividades) // <--- SOLUCIÓN: Tipar 'usuario'
  @JoinColumn({ name: "usuarioId" })
  usuario!: Usuario;
  @Column()
  usuarioId!: number;

  // --- Relación con Equipo (Opcional/Contexto) ---
  // Si la columna original era 'equipo_id', la mapeamos, pero es redundante si siempre viene de Tarea.
  // La mantenemos para compatibilidad, usando camelCase 'equipoId':
  @Column({ nullable: true })
  equipoId?: number;

  /* Nota: Se han eliminado las columnas redundantes 'equipo_id' y 'usuario_id' 
       y se ha estandarizado 'creado_en' a 'fechaCreacion'. */
}
