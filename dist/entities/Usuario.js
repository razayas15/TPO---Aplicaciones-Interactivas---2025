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
exports.Usuario = void 0;
const typeorm_1 = require("typeorm");
// Importamos las entidades con las que se relaciona (las crearemos después)
const Membresia_1 = require("./Membresia");
const Tarea_1 = require("./Tarea");
let Usuario = class Usuario {
    toJSON() {
        const { password, ...usuario } = this;
        return usuario;
    }
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Usuario.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Usuario.prototype, "fechaActualizacion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Membresia_1.Membresia, (membresia) => membresia.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "membresias", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Tarea_1.Tarea, (tarea) => tarea.creador),
    __metadata("design:type", Array)
], Usuario.prototype, "tareasCreadas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Tarea_1.Tarea, (tarea) => tarea.responsable),
    __metadata("design:type", Array)
], Usuario.prototype, "tareasAsignadas", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)("usuarios")
], Usuario);
