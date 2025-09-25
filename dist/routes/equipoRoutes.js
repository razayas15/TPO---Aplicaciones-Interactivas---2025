"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const equiposController_1 = require("../controllers/equiposController");
const router = (0, express_1.Router)();
router.post("/", equiposController_1.crearEquipo);
router.get("/", equiposController_1.listarEquipos);
exports.default = router;
