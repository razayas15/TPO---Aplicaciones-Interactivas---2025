"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Usuario_1 = require("./entities/Usuario");
const Equipo_1 = require("./entities/Equipo");
const Membresia_1 = require("./entities/Membresia");
const Tarea_1 = require("./entities/Tarea");
const Etiqueta_1 = require("./entities/Etiqueta");
const Actividad_1 = require("./entities/Actividad");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    logging: false,
    entities: [Usuario_1.Usuario, Equipo_1.Equipo, Membresia_1.Membresia, Tarea_1.Tarea, Etiqueta_1.Etiqueta, Actividad_1.Actividad],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
});
