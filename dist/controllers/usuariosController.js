"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarUsuarios = exports.crearUsuario = void 0;
const data_source_1 = require("../data-source");
const Usuario_1 = require("../entities/Usuario");
const crearUsuario = async (req, res) => {
    try {
        const { nombre, correo } = req.body;
        if (!nombre || !correo) {
            return res.status(400).json({ error: "Nombre y correo son obligatorios" });
        }
        const repo = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
        const usuario = repo.create({ nombre, correo });
        await repo.save(usuario);
        res.json(usuario);
    }
    catch (err) {
        res.status(500).json({ error: "Error al crear usuario", details: err });
    }
};
exports.crearUsuario = crearUsuario;
const listarUsuarios = async (_req, res) => {
    const repo = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
    const usuarios = await repo.find();
    res.json(usuarios);
};
exports.listarUsuarios = listarUsuarios;
