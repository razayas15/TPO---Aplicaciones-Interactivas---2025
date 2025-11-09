"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarea = void 0;
const typeorm_1 = require("typeorm");
const Usuario_1 = require("./Usuario");
const Equipo_1 = require("./Equipo");
const Etiqueta_1 = require("./Etiqueta");
const Actividad_1 = require("./Actividad");
const Comentario_1 = require("./Comentario");
class Tarea {
}
exports.Tarea = Tarea;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Tarea.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tarea.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Tarea.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'pendiente' }),
    __metadata("design:type", String)
], Tarea.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'media' }),
    __metadata("design:type", String)
], Tarea.prototype, "prioridad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Tarea.prototype, "fechaLimite", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Usuario_1.Usuario, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'asignadoAId' }),
    __metadata("design:type", Usuario_1.Usuario)
], Tarea.prototype, "asignadoA", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Tarea.prototype, "asignadoAId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Usuario_1.Usuario, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'creadoPorId' }),
    __metadata("design:type", Usuario_1.Usuario)
], Tarea.prototype, "creadoPor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Tarea.prototype, "creadoPorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Equipo_1.Equipo, equipo => equipo.tareas, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'equipoId' }),
    __metadata("design:type", Equipo_1.Equipo)
], Tarea.prototype, "equipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Tarea.prototype, "equipoId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Etiqueta_1.Etiqueta),
    (0, typeorm_1.JoinTable)({
        name: 'tarea_etiquetas',
        joinColumn: { name: 'tareaId' },
        inverseJoinColumn: { name: 'etiquetaId' }
    }),
    __metadata("design:type", Array)
], Tarea.prototype, "etiquetas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Actividad_1.Actividad, actividad => actividad.tarea, {
        cascade: true
    }),
    __metadata("design:type", Array)
], Tarea.prototype, "historial", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comentario_1.Comentario, comentario => comentario.tarea, {
        cascade: true
    }),
    __metadata("design:type", Array)
], Tarea.prototype, "comentarios", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Tarea.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Tarea.prototype, "fechaActualizacion", void 0);
