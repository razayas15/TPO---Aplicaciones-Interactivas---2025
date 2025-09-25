"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
const router = (0, express_1.Router)();
// POST /usuarios
router.post("/", usuariosController_1.crearUsuario);
// GET /usuarios
router.get("/", usuariosController_1.listarUsuarios);
exports.default = router;
