"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const equipoRoutes_1 = __importDefault(require("./routes/equipoRoutes"));
const tareasRoutes_1 = __importDefault(require("./routes/tareasRoutes"));
const etiquetasRoutes_1 = __importDefault(require("./routes/etiquetasRoutes"));
const actividadRoutes_1 = __importDefault(require("./routes/actividadRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Rutas
app.use("/usuarios", usuarioRoutes_1.default);
app.use("/equipos", equipoRoutes_1.default);
app.use("/tareas", tareasRoutes_1.default);
app.use("/etiquetas", etiquetasRoutes_1.default);
app.use("/actividad", actividadRoutes_1.default);
// Inicializar DB y servidor
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Base de datos inicializada");
    app.listen(3000, () => {
        console.log("Servidor corriendo en http://localhost:3000");
    });
})
    .catch((error) => console.error("Error en DataSource:", error));
app.get("/", (req, res) => {
    res.send(`
    <html>
      <head>
        <title>Gestor de Tareas</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f9f9f9;
            color: #333;
            text-align: center;
            padding: 50px;
          }
          h1 {
            color: #007acc;
          }
          .routes {
            margin-top: 20px;
          }
          a {
            display: block;
            margin: 5px 0;
            text-decoration: none;
            color: #007acc;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h1> Gestor de Tareas</h1>
        <p>Endpoints disponibles:</p>
        <div class="routes">
          <a href="/usuarios">/usuarios</a>
          <a href="/equipos">/equipos</a>
          <a href="/tareas">/tareas</a>
        </div>
      </body>
    </html>
  `);
});
