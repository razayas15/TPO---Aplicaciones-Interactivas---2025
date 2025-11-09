"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSchema1758815930984 = void 0;
class InitialSchema1758815930984 {
    constructor() {
        this.name = 'InitialSchema1758815930984';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "temporary_membresias" ("id" integer PRIMARY KEY, "equipo_id" integer NOT NULL, "usuario_id" integer NOT NULL, "rol" text NOT NULL, "agregado_en" datetime DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "temporary_membresias"("id", "equipo_id", "usuario_id", "rol", "agregado_en") SELECT "id", "equipo_id", "usuario_id", "rol", "agregado_en" FROM "membresias"`);
        await queryRunner.query(`DROP TABLE "membresias"`);
        await queryRunner.query(`ALTER TABLE "temporary_membresias" RENAME TO "membresias"`);
        await queryRunner.query(`CREATE TABLE "temporary_usuarios" ("id" integer PRIMARY KEY, "nombre" text NOT NULL, "correo" text NOT NULL, "creado_en" datetime DEFAULT (CURRENT_TIMESTAMP), "estado" varchar NOT NULL DEFAULT ('activo'), CONSTRAINT "UQ_63665765c1a778a770c9bd585d3" UNIQUE ("correo"))`);
        await queryRunner.query(`INSERT INTO "temporary_usuarios"("id", "nombre", "correo", "creado_en") SELECT "id", "nombre", "correo", "creado_en" FROM "usuarios"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`ALTER TABLE "temporary_usuarios" RENAME TO "usuarios"`);
        await queryRunner.query(`CREATE TABLE "temporary_usuarios" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nombre" varchar NOT NULL, "correo" varchar NOT NULL, "creado_en" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "estado" varchar NOT NULL DEFAULT ('activo'), CONSTRAINT "UQ_63665765c1a778a770c9bd585d3" UNIQUE ("correo"))`);
        await queryRunner.query(`INSERT INTO "temporary_usuarios"("id", "nombre", "correo", "creado_en", "estado") SELECT "id", "nombre", "correo", "creado_en", "estado" FROM "usuarios"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`ALTER TABLE "temporary_usuarios" RENAME TO "usuarios"`);
        await queryRunner.query(`CREATE TABLE "temporary_equipos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nombre" varchar NOT NULL, "creado_por" integer NOT NULL, "creado_en" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "temporary_equipos"("id", "nombre", "creado_por", "creado_en") SELECT "id", "nombre", "creado_por", "creado_en" FROM "equipos"`);
        await queryRunner.query(`DROP TABLE "equipos"`);
        await queryRunner.query(`ALTER TABLE "temporary_equipos" RENAME TO "equipos"`);
        await queryRunner.query(`CREATE TABLE "temporary_membresias" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "equipo_id" integer NOT NULL, "usuario_id" integer NOT NULL, "rol" varchar NOT NULL, "agregado_en" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "temporary_membresias"("id", "equipo_id", "usuario_id", "rol", "agregado_en") SELECT "id", "equipo_id", "usuario_id", "rol", "agregado_en" FROM "membresias"`);
        await queryRunner.query(`DROP TABLE "membresias"`);
        await queryRunner.query(`ALTER TABLE "temporary_membresias" RENAME TO "membresias"`);
        await queryRunner.query(`CREATE TABLE "temporary_tareas" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "titulo" varchar NOT NULL, "descripcion" text, "estado" varchar NOT NULL DEFAULT ('PENDIENTE'), "prioridad" integer NOT NULL DEFAULT (2), "fecha_vencimiento" datetime, "creador_id" integer NOT NULL, "asignada_a" integer, "equipo_id" integer NOT NULL, "creado_en" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "actualizado_en" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "temporary_tareas"("id", "titulo", "descripcion", "estado", "prioridad", "fecha_vencimiento", "creador_id", "asignada_a", "equipo_id", "creado_en", "actualizado_en") SELECT "id", "titulo", "descripcion", "estado", "prioridad", "fecha_vencimiento", "creador_id", "asignada_a", "equipo_id", "creado_en", "actualizado_en" FROM "tareas"`);
        await queryRunner.query(`DROP TABLE "tareas"`);
        await queryRunner.query(`ALTER TABLE "temporary_tareas" RENAME TO "tareas"`);
        await queryRunner.query(`CREATE TABLE "temporary_etiquetas" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nombre" varchar NOT NULL, "color" varchar, "creado_en" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "temporary_etiquetas"("id", "nombre", "color", "creado_en") SELECT "id", "nombre", "color", "creado_en" FROM "etiquetas"`);
        await queryRunner.query(`DROP TABLE "etiquetas"`);
        await queryRunner.query(`ALTER TABLE "temporary_etiquetas" RENAME TO "etiquetas"`);
        await queryRunner.query(`CREATE TABLE "temporary_actividad" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "equipo_id" integer, "usuario_id" integer, "tipo" varchar NOT NULL, "descripcion" text, "metadata" text, "creado_en" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "temporary_actividad"("id", "equipo_id", "usuario_id", "tipo", "descripcion", "metadata", "creado_en") SELECT "id", "equipo_id", "usuario_id", "tipo", "descripcion", "metadata", "creado_en" FROM "actividad"`);
        await queryRunner.query(`DROP TABLE "actividad"`);
        await queryRunner.query(`ALTER TABLE "temporary_actividad" RENAME TO "actividad"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "actividad" RENAME TO "temporary_actividad"`);
        await queryRunner.query(`CREATE TABLE "actividad" ("id" integer PRIMARY KEY, "equipo_id" integer, "usuario_id" integer, "tipo" text NOT NULL, "descripcion" text, "metadata" text, "creado_en" datetime DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "actividad"("id", "equipo_id", "usuario_id", "tipo", "descripcion", "metadata", "creado_en") SELECT "id", "equipo_id", "usuario_id", "tipo", "descripcion", "metadata", "creado_en" FROM "temporary_actividad"`);
        await queryRunner.query(`DROP TABLE "temporary_actividad"`);
        await queryRunner.query(`ALTER TABLE "etiquetas" RENAME TO "temporary_etiquetas"`);
        await queryRunner.query(`CREATE TABLE "etiquetas" ("id" integer PRIMARY KEY, "nombre" text NOT NULL, "color" text, "creado_en" datetime DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "etiquetas"("id", "nombre", "color", "creado_en") SELECT "id", "nombre", "color", "creado_en" FROM "temporary_etiquetas"`);
        await queryRunner.query(`DROP TABLE "temporary_etiquetas"`);
        await queryRunner.query(`ALTER TABLE "tareas" RENAME TO "temporary_tareas"`);
        await queryRunner.query(`CREATE TABLE "tareas" ("id" integer PRIMARY KEY, "titulo" text NOT NULL, "descripcion" text, "estado" text NOT NULL DEFAULT ('PENDIENTE'), "prioridad" integer NOT NULL DEFAULT (2), "fecha_vencimiento" datetime, "creador_id" integer NOT NULL, "asignada_a" integer, "equipo_id" integer NOT NULL, "creado_en" datetime DEFAULT (CURRENT_TIMESTAMP), "actualizado_en" datetime DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "tareas"("id", "titulo", "descripcion", "estado", "prioridad", "fecha_vencimiento", "creador_id", "asignada_a", "equipo_id", "creado_en", "actualizado_en") SELECT "id", "titulo", "descripcion", "estado", "prioridad", "fecha_vencimiento", "creador_id", "asignada_a", "equipo_id", "creado_en", "actualizado_en" FROM "temporary_tareas"`);
        await queryRunner.query(`DROP TABLE "temporary_tareas"`);
        await queryRunner.query(`ALTER TABLE "membresias" RENAME TO "temporary_membresias"`);
        await queryRunner.query(`CREATE TABLE "membresias" ("id" integer PRIMARY KEY, "equipo_id" integer NOT NULL, "usuario_id" integer NOT NULL, "rol" text NOT NULL, "agregado_en" datetime DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "membresias"("id", "equipo_id", "usuario_id", "rol", "agregado_en") SELECT "id", "equipo_id", "usuario_id", "rol", "agregado_en" FROM "temporary_membresias"`);
        await queryRunner.query(`DROP TABLE "temporary_membresias"`);
        await queryRunner.query(`ALTER TABLE "equipos" RENAME TO "temporary_equipos"`);
        await queryRunner.query(`CREATE TABLE "equipos" ("id" integer PRIMARY KEY, "nombre" text NOT NULL, "creado_por" integer NOT NULL, "creado_en" datetime DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "equipos"("id", "nombre", "creado_por", "creado_en") SELECT "id", "nombre", "creado_por", "creado_en" FROM "temporary_equipos"`);
        await queryRunner.query(`DROP TABLE "temporary_equipos"`);
        await queryRunner.query(`ALTER TABLE "usuarios" RENAME TO "temporary_usuarios"`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" integer PRIMARY KEY, "nombre" text NOT NULL, "correo" text NOT NULL, "creado_en" datetime DEFAULT (CURRENT_TIMESTAMP), "estado" varchar NOT NULL DEFAULT ('activo'), CONSTRAINT "UQ_63665765c1a778a770c9bd585d3" UNIQUE ("correo"))`);
        await queryRunner.query(`INSERT INTO "usuarios"("id", "nombre", "correo", "creado_en", "estado") SELECT "id", "nombre", "correo", "creado_en", "estado" FROM "temporary_usuarios"`);
        await queryRunner.query(`DROP TABLE "temporary_usuarios"`);
        await queryRunner.query(`ALTER TABLE "usuarios" RENAME TO "temporary_usuarios"`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" integer PRIMARY KEY, "nombre" text NOT NULL, "correo" text NOT NULL, "creado_en" datetime DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_63665765c1a778a770c9bd585d3" UNIQUE ("correo"))`);
        await queryRunner.query(`INSERT INTO "usuarios"("id", "nombre", "correo", "creado_en") SELECT "id", "nombre", "correo", "creado_en" FROM "temporary_usuarios"`);
        await queryRunner.query(`DROP TABLE "temporary_usuarios"`);
        await queryRunner.query(`ALTER TABLE "membresias" RENAME TO "temporary_membresias"`);
        await queryRunner.query(`CREATE TABLE "membresias" ("id" integer PRIMARY KEY, "equipo_id" integer NOT NULL, "usuario_id" integer NOT NULL, "rol" text NOT NULL, "agregado_en" datetime DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_6af9e3f70a1864c0ffe13b67f38" UNIQUE ("equipo_id", "usuario_id"))`);
        await queryRunner.query(`INSERT INTO "membresias"("id", "equipo_id", "usuario_id", "rol", "agregado_en") SELECT "id", "equipo_id", "usuario_id", "rol", "agregado_en" FROM "temporary_membresias"`);
        await queryRunner.query(`DROP TABLE "temporary_membresias"`);
    }
}
exports.InitialSchema1758815930984 = InitialSchema1758815930984;
