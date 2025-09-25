"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearEtiqueta = crearEtiqueta;
exports.listarEtiquetas = listarEtiquetas;
const data_source_1 = require("../data-source");
const Etiqueta_1 = require("../entities/Etiqueta");
async function crearEtiqueta(req, res) {
    try {
        const repo = data_source_1.AppDataSource.getRepository(Etiqueta_1.Etiqueta);
        const etiqueta = repo.create(req.body);
        await repo.save(etiqueta);
        res.json(etiqueta);
    }
    catch (err) {
        res.status(500).json({ error: "Error al crear etiqueta", details: err });
    }
}
async function listarEtiquetas(req, res) {
    try {
        const repo = data_source_1.AppDataSource.getRepository(Etiqueta_1.Etiqueta);
        const etiquetas = await repo.find();
        res.json(etiquetas);
    }
    catch (err) {
        res.status(500).json({ error: "Error al listar etiquetas", details: err });
    }
}
