"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const etiquetasController_1 = require("../controllers/etiquetasController");
const router = (0, express_1.Router)();
router.post("/", etiquetasController_1.crearEtiqueta);
router.get("/", etiquetasController_1.listarEtiquetas);
exports.default = router;
