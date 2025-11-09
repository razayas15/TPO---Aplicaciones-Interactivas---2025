"use strict";
// src/entities/Membresia.ts
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
exports.Membresia = void 0;
const typeorm_1 = require("typeorm");
const Usuario_1 = require("./Usuario");
const Equipo_1 = require("./Equipo");
// Asegura que un usuario solo tenga una membresía por equipo
let Membresia = class Membresia {
};
exports.Membresia = Membresia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Membresia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['Propietario', 'Miembro'],
        default: 'Miembro',
    }),
    __metadata("design:type", String)
], Membresia.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Usuario_1.Usuario, usuario => usuario.membresias, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'usuarioId' }),
    __metadata("design:type", Usuario_1.Usuario)
], Membresia.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Membresia.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Equipo_1.Equipo, equipo => equipo.membresias, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'equipoId' }),
    __metadata("design:type", Equipo_1.Equipo)
], Membresia.prototype, "equipo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Membresia.prototype, "equipoId", void 0);
exports.Membresia = Membresia = __decorate([
    (0, typeorm_1.Unique)(['usuarioId', 'equipoId']),
    (0, typeorm_1.Entity)('membresias')
], Membresia);
