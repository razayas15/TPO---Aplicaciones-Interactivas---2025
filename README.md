# 🚀 Gestor de Tareas Colaborativas — Backend API (TPI)

Aplicación **backend (API REST)** desarrollada para la **Gestión Colaborativa de Tareas**, implementando autenticación, roles, control de acceso y flujos de trabajo según los requisitos del **TPI**.

---

## 🛠️ Tecnologías Clave Utilizadas

| Tecnología        | Versión mínima | Propósito |
|-------------------|----------------|------------|
| **Node.js**       | v16+            | Entorno de ejecución |
| **TypeScript**    | —               | Lenguaje de programación tipado |
| **Express**       | —               | Framework para routing y middleware |
| **TypeORM**       | —               | ORM para el mapeo objeto-relacional |
| **SQLite**        | —               | Base de datos ligera, sin servidor externo |
| **bcrypt**        | —               | Hashing de contraseñas (seguridad) |
| **class-validator** | —             | Validación de DTOs (Data Transfer Objects) |

---

## 📂 Estructura del Proyecto (Arquitectura de 4 Capas)

El proyecto sigue una arquitectura modular de **4 capas**, asegurando separación de responsabilidades y fácil mantenimiento.

| Carpeta | Rol | Ejemplos |
|----------|-----|-----------|
| `src/controllers/` | Controladores HTTP (reciben y responden peticiones) | `usuariosController.ts`, `tareasController.ts` |
| `src/services/` | Lógica de negocio y validaciones | `usuariosService.ts`, `equiposService.ts` |
| `src/entities/` | Modelos de base de datos (TypeORM Entities) | `Usuario.ts`, `Tarea.ts`, `Membresia.ts` |
| `src/routes/` | Definición de endpoints de Express | `usuarioRoutes.ts`, `equipoRoutes.ts` |
| `src/middlewares/` | Funciones intermedias (seguridad, validación) | `authMiddleware.ts`, `validateDto.ts` |

---

## 🧱 Entidades Mínimas Implementadas

- **Usuario:** Autenticación y gestión de perfiles.  
- **Equipo:** Grupos de trabajo colaborativos.  
- **Membresía:** Relación Usuario–Equipo con roles (Propietario / Miembro).  
- **Tarea:** Núcleo del sistema (estado, prioridad, asignación).  
- **Comentario / Actividad / Notificación:** Auditoría y colaboración entre usuarios.

---

## ⚙️ Pasos para la Configuración y Ejecución

### 🔹 Requisitos Previos
1. Tener **Node.js** y **npm** instalados.  
2. Limpiar base de datos previa (si existe):

```bash
Remove-Item db.sqlite
# Eliminar migraciones antiguas si existen
Remove-Item src/migrations/*.ts

1️⃣ Instalación de Dependencias

Ejecutar en la carpeta raíz del proyecto:
npm install

2️⃣ Arranque del Servidor (Modo Desarrollo)

El servidor se ejecuta con ts-node y genera las tablas automáticamente gracias a synchronize: true en data-source.ts.
npm run dev
✅ Verificá que en consola aparezca:
Servidor escuchando en http://localhost:3000

🔑 Endpoints Principales para Pruebas
Podés probarlos desde Postman, Thunder Client o request.http.

🔸 Autenticación (sin token)
| Módulo      | Método | Endpoint               | Descripción             |
| ----------- | ------ | ---------------------- | ----------------------- |
| **Usuario** | `POST` | `/api/usuarios/signup` | Crear cuenta de usuario |
| **Usuario** | `POST` | `/api/usuarios/login`  | Iniciar sesión          |



🔸 Flujos de Tareas y Colaboración (requiere token)
| Módulo           | Método  | Endpoint                           | Funcionalidad                                            |
| ---------------- | ------- | ---------------------------------- | -------------------------------------------------------- |
| **Equipo**       | `POST`  | `/api/equipos`                     | Crea un equipo y asigna al creador como propietario      |
| **Tarea**        | `POST`  | `/api/tareas`                      | Crea una nueva tarea asociada a un equipo                |
| **Tarea**        | `PATCH` | `/api/tareas/:id/estado`           | Cambia el estado de una tarea (aplica reglas de negocio) |
| **Comentario**   | `POST`  | `/api/tareas/:tareaId/comentarios` | Agrega comentarios a la tarea                            |
| **Notificación** | `GET`   | `/api/notificaciones`              | Lista las notificaciones del usuario                     |

----------------------------------------------------------------------------------------------------------------------
🧩 Notas de Desarrollo

🔒 Seguridad: Las contraseñas se manejan con bcrypt y nunca se devuelven en las respuestas JSON.

✅ Validación: Todos los datos entrantes se validan mediante class-validator en DTOs.

⚙️ Modelado: Se implementa una estructura unidireccional entre entidades (Tarea → Actividad, Tarea → Comentario) para evitar problemas de carga circular en TypeORM.

🧠 Arquitectura: Las reglas de negocio viven en la capa de services, manteniendo los controladores limpios y simples.

📘 Autor: Proyecto académico — Aplicaciones Interactivas - UADE 2025
📅 Versión: 1.0.0
💾 Base de datos: SQLite (local)