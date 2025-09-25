"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarActividad = listarActividad;
const data_source_1 = require("../data-source");
const Actividad_1 = require("../entities/Actividad");
async function listarActividad(req, res) {
    try {
        const repo = data_source_1.AppDataSource.getRepository(Actividad_1.Actividad);
        const { equipoId, usuarioId, page = 1, limit = 10 } = req.query;
        const qb = repo.createQueryBuilder("actividad");
        if (equipoId) {
            qb.andWhere("actividad.equipo_id = :equipoId", { equipoId });
        }
        if (usuarioId) {
            qb.andWhere("actividad.usuario_id = :usuarioId", { usuarioId });
        }
        qb.skip((+page - 1) * +limit).take(+limit).orderBy("actividad.creado_en", "DESC");
        const data = await qb.getMany();
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ error: "Error al listar actividad", details: err });
    }
}
