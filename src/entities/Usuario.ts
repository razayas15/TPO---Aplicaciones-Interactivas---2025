import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "usuarios" })
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number; //ID para reconocer 

  @Column()
  nombre!: string; //nombre del personal/usuario

  @Column({ unique: true })
  correo!: string; //correo electronico unico

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  creado_en!: string; // fecha de creación

   @Column({ default: "activo" })
  estado!: string; // activo | inactivo
}
