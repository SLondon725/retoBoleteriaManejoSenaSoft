import { Router } from "express";
import { RolesController } from "@/controllers/RolesController";
import { ValidatorJWT } from "@/middleware/ValidatorJWT";

const router = Router();
const rolesController = new RolesController();
// const validatorJWT = new ValidatorJWT().validateJWT;

// Rutas para roles
router.get("/", rolesController.obtenerTodosLosRoles);
router.get("/buscar", rolesController.buscarRolesPorNombre);
router.get("/:id", rolesController.obtenerRolPorId);
router.get("/:idRol/usuarios", rolesController.obtenerUsuariosPorRol);
router.post("/", rolesController.crearRol);
router.put("/:id", rolesController.actualizarRol);
router.delete("/:id", rolesController.eliminarRol);

export default router;