import "reflect-metadata";
import express from "express";

import usuarioRoutes from "./routes/usuarioRoutes";
import equipoRoutes from "./routes/equipoRoutes";
import tareasRoutes from "./routes/tareasRoutes";
import etiquetaRoutes from "./routes/etiquetasRoutes";
import actividadRoutes from "./routes/actividadesRoutes";  
const app = express();
app.use(express.json());
import { AppDataSource } from "./data-source";



// Rutas
app.use("/usuarios", usuarioRoutes);
app.use("/equipos", equipoRoutes);
app.use("/tareas", tareasRoutes);
app.use("/etiquetas", etiquetaRoutes); 
app.use("/actividad", actividadRoutes);  
// Inicializar DB y servidor
AppDataSource.initialize()
    .then(() => {
        console.log("Conexión a la base de datos establecida.");
        // --- INICIAR EXPRESS AQUÍ ---
        // const app = express();
        // app.listen(3000, () => console.log('Servidor corriendo en 3000'));
    })
    .catch((error) => console.error("Error al iniciar TypeORM:", error));

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

