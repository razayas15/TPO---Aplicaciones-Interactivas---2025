"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comentariosController_1 = require("../controllers/comentariosController");
const router = (0, express_1.Router)();
// GET /api/tareas/:tareaId/comentarios - Listar comentarios
router.get('/tareas/:tareaId/comentarios', comentariosController_1.ComentariosController.listarComentarios);
// POST /api/tareas/:tareaId/comentarios - Crear comentario
router.post('/tareas/:tareaId/comentarios', comentariosController_1.ComentariosController.crearComentario);
// PUT /api/tareas/:tareaId/comentarios/:id - Editar comentario
router.put('/tareas/:tareaId/comentarios/:id', comentariosController_1.ComentariosController.editarComentario);
// DELETE /api/tareas/:tareaId/comentarios/:id - Eliminar comentario
router.delete('/tareas/:tareaId/comentarios/:id', comentariosController_1.ComentariosController.eliminarComentario);
exports.default = router;
