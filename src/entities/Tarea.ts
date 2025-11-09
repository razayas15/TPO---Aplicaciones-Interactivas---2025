import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Usuario } from "./Usuario";
import { Equipo } from "./Equipo";
import { Etiqueta } from "./Etiqueta";
import { Actividad } from "./Actividad";
import { Comentario } from "./Comentario";

export class Tarea {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column("text")
  descripcion!: string;

  @Column({ type: 'enum', enum: ['PENDIENTE', 'EN_CURSO', 'FINALIZADA', 'CANCELADA'], default: 'PENDIENTE' })
estado!: string; // O el enum tipado

  @Column({ type: "enum", enum: ["Alta", "Media", "Baja"], default: "Media" })
  prioridad!: "Alta" | "Media" | "Baja";

 @Column({ type: 'timestamp', nullable: true })
fechaLimite?: Date; // <-- DEBE SER OPCIONAL (añadir ?)

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: "asignadoAId" })
  asignadoA?: Usuario;

  @Column({ nullable: true })
  asignadoAId?: number;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: "creadoPorId" })
  creadoPor!: Usuario;

  @Column()
  creadoPorId!: number;

  @ManyToOne(() => Equipo, (equipo) => equipo.tareas, { nullable: true })
  @JoinColumn({ name: "equipoId" })
  equipo!: Equipo;

  @Column()
  equipoId!: number;

  @ManyToMany(() => Etiqueta)
  @JoinTable({
    name: "tarea_etiquetas",
    joinColumn: { name: "tareaId" },
    inverseJoinColumn: { name: "etiquetaId" },
  })
  etiquetas!: Etiqueta[];
  istorial!: Actividad[];

  @OneToMany(() => Comentario, (comentario) => comentario.tarea, {
    cascade: true,
  })
  comentarios!: Comentario[];

  @CreateDateColumn()
  fechaCreacion!: Date;

  @UpdateDateColumn()
  fechaActualizacion!: Date;

}
