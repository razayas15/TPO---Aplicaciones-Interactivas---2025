import "reflect-metadata";
import express from "express";
// Importar CORS para permitir peticiones del frontend
import cors from "cors"; 

import usuarioRoutes from "./routes/usuarioRoutes";
import equipoRoutes from "./routes/equipoRoutes";
import tareasRoutes from "./routes/tareasRoutes";
import etiquetaRoutes from "./routes/etiquetasRoutes";
import actividadRoutes from "./routes/actividadesRoutes"; 
import comentariosRoutes from "./routes/comentariosRoutes"; // Asumimos esta ruta también existe
import notificacionesRoutes from "./routes/notificacionesRoutes"; // Asumimos esta ruta también existe

import { AppDataSource } from "./data-source";

const PORT = 3000;
const app = express();

// Middlewares Globales
app.use(cors()); // Permite acceso desde el frontend
app.use(express.json()); // Permite a Express parsear JSON del cuerpo de la petición

// Montar Rutas con el prefijo /api
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/equipos", equipoRoutes);
app.use("/api/tareas", tareasRoutes); 
app.use("/api/etiquetas", etiquetaRoutes); 
app.use("/api/actividades", actividadRoutes); // Usamos /actividades como se estandarizó
app.use("/api/comentarios", comentariosRoutes);
app.use("/api/notificaciones", notificacionesRoutes);


// Inicializar DB y servidor
AppDataSource.initialize()
    .then(() => {
        console.log("Conexión a la base de datos establecida.");
        
        // --- CÓDIGO PARA INICIAR EL SERVIDOR EXPRESS ---
        app.listen(PORT, () => {
            console.log(`Servidor Express escuchando en http://localhost:${PORT}/api`);
        });
        
    })
    .catch((error) => console.error("Error al iniciar TypeORM:", error));

// Ruta de bienvenida (opcional, para verificar que Express está vivo)
app.get("/", (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Gestor de Tareas API</title>
                <style>
                    body { font-family: Arial, sans-serif; background: #f9f9f9; color: #333; text-align: center; padding: 50px; }
                    h1 { color: #007acc; }
                    .routes { margin-top: 20px; }
                    a { display: block; margin: 5px 0; text-decoration: none; color: #007acc; }
                    a:hover { text-decoration: underline; }
                </style>
            </head>
            <body>
                <h1>Gestor de Tareas API</h1>
                <p>Backend operativo. Accede a los endpoints vía /api/recurso:</p>
                <div class="routes">
                    <a href="http://localhost:${PORT}/api/usuarios/login">/api/usuarios</a>
                    <a href="http://localhost:${PORT}/api/equipos">/api/equipos</a>
                    <a href="http://localhost:${PORT}/api/tareas">/api/tareas</a>
                </div>
            </body>
        </html>
    `);
});

