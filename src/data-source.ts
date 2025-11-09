// src/data-source.ts

import "reflect-metadata";
import { DataSource } from "typeorm";
import path from 'path'; 
// Importar TODAS las entidades para asegurar que Node.js las cargue
import { Usuario } from "./entities/Usuario";
import { Equipo } from "./entities/Equipo";
import { Membresia } from "./entities/Membresia"; 
import { Etiqueta } from "./entities/Etiqueta";
import { Comentario } from "./entities/Comentario";
import { Notificacion } from "./entities/Notificacion"; 
import { Tarea } from "./entities/Tarea"; 
import { Actividad } from "./entities/Actividad"; 

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true, // Para reconstruir el esquema limpio en desarrollo
    logging: false,
    
    // --- SOLUCIÓN: LISTA COMPLETA + RUTAS ABSOLUTAS ---
    entities: [
        // 1. Listar explícitamente todas las clases importadas (método más seguro)
        Usuario, 
        Equipo, 
        Membresia, 
        Etiqueta, 
        Comentario, 
        Notificacion,
        Tarea, 
        Actividad,
        
        // 2. Usar Glob para asegurar la carga en runtime (anula problemas de ts-node)
        path.join(__dirname, 'entities', '*.ts')
    ],
    
    // Dejamos las migraciones vacías para la inicialización limpia (ya eliminamos la antigua)
    migrations: [], 
    subscribers: [],
});