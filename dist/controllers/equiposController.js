"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarEquipos = exports.crearEquipo = void 0;
const data_source_1 = require("../data-source");
const Equipo_1 = require("../entities/Equipo");
const crearEquipo = async (req, res) => {
    try {
        const { nombre, creado_por } = req.body;
        const repo = data_source_1.AppDataSource.getRepository(Equipo_1.Equipo);
        const equipo = repo.create({ nombre, creado_por });
        await repo.save(equipo);
        res.json(equipo);
    }
    catch (err) {
        res.status(500).json({ error: "Error al crear equipo", details: err });
    }
};
exports.crearEquipo = crearEquipo;
const listarEquipos = async (_req, res) => {
    const repo = data_source_1.AppDataSource.getRepository(Equipo_1.Equipo);
    const equipos = await repo.find();
    res.json(equipos);
};
exports.listarEquipos = listarEquipos;
