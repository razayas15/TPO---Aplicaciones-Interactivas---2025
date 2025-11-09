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
exports.Comentario = void 0;
const typeorm_1 = require("typeorm");
const Tarea_1 = require("./Tarea");
const Usuario_1 = require("./Usuario");
let Comentario = class Comentario {
    // Método para devolver solo datos seguros (sin password del autor)
    toJSON() {
        return {
            id: this.id,
            contenido: this.contenido,
            tareaId: this.tareaId,
            autor: this.autor ? {
                id: this.autor.id,
                nombre: this.autor.nombre,
                email: this.autor.email
            } : null,
            fechaCreacion: this.fechaCreacion
        };
    }
};
exports.Comentario = Comentario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Comentario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Comentario.prototype, "contenido", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Tarea_1.Tarea, tarea => tarea.comentarios, {
        onDelete: 'CASCADE',
        nullable: false
    }),
    (0, typeorm_1.JoinColumn)({ name: 'tareaId' }),
    __metadata("design:type", Tarea_1.Tarea)
], Comentario.prototype, "tarea", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Comentario.prototype, "tareaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Usuario_1.Usuario, {
        eager: true,
        nullable: false
    }),
    (0, typeorm_1.JoinColumn)({ name: 'autorId' }),
    __metadata("design:type", Usuario_1.Usuario)
], Comentario.prototype, "autor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Comentario.prototype, "autorId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Comentario.prototype, "fechaCreacion", void 0);
exports.Comentario = Comentario = __decorate([
    (0, typeorm_1.Entity)('comentarios')
], Comentario);
