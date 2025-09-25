import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entities/Usuario";

export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, correo } = req.body;

    if (!nombre || !correo) {
      return res.status(400).json({ error: "Nombre y correo son obligatorios" });
    }

    const repo = AppDataSource.getRepository(Usuario);
    const usuario = repo.create({ nombre, correo });
    await repo.save(usuario);

    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: "Error al crear usuario", details: err });
  }
};

export const listarUsuarios = async (_req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Usuario);
  const usuarios = await repo.find();
  res.json(usuarios);
};

//obtiene los usuarios por medio del ID
export const obtenerUsuarioPorId = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Usuario);
  const usuario = await repo.findOneBy({ id: parseInt(req.params.id) });

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json(usuario);
};

// Actualizar usuario
export const actualizarUsuario = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Usuario);
  const usuario = await repo.findOneBy({ id: parseInt(req.params.id) });

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const { nombre, correo, estado } = req.body;

  if (nombre) usuario.nombre = nombre;
  if (correo) usuario.correo = correo;
  if (estado) usuario.estado = estado;

  await repo.save(usuario);

  res.json(usuario);
};

// Eliminar usuario
export const eliminarUsuario = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Usuario);
  const usuario = await repo.findOneBy({ id: parseInt(req.params.id) });

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  await repo.remove(usuario);
  res.status(204).send();
};