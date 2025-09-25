import { Router } from "express";
import { 
    crearUsuario,
    listarUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
} from "../controllers/usuariosController";

const router = Router();

// CRUD básico de usuarios
router.post("/", crearUsuario);          // Crear
router.get("/", listarUsuarios);         // Listar todos
router.get("/:id", obtenerUsuarioPorId); // Buscar por ID
router.put("/:id", actualizarUsuario);   // Actualizar
router.delete("/:id", eliminarUsuario);  // Eliminar

export default router;
