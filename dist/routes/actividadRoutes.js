"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actividadController_1 = require("../controllers/actividadController");
const router = (0, express_1.Router)();
router.get("/", actividadController_1.listarActividad);
exports.default = router;
