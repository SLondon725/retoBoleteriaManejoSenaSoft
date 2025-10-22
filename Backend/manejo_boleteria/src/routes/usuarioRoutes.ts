import { Router } from "express";
import { UsuarioController } from "@/controllers/UsuarioController";
import { ValidatorJWT } from "@/middleware/ValidatorJWT";

const router = Router();
const usuarioController = new UsuarioController();
// const validatorJWT = new ValidatorJWT().validateJWT;

// Rutas para usuarios
router.get("/", usuarioController.obtenerTodosLosUsuarios);
router.get("/buscar", usuarioController.buscarUsuariosPorNombre);
router.get("/correo/:correo", usuarioController.obtenerUsuarioPorCorreo);
router.get("/rol/:idRol", usuarioController.obtenerUsuariosPorRol);
router.get("/:numIdentificacion", usuarioController.obtenerUsuarioPorId);
router.post("/", usuarioController.crearUsuario);
router.post("/verificar-credenciales", usuarioController.verificarCredenciales);
router.put("/:numIdentificacion", usuarioController.actualizarUsuario);
router.put("/:numIdentificacion/password", usuarioController.cambiarPassword);
router.delete("/:numIdentificacion", usuarioController.eliminarUsuario);

export default router;