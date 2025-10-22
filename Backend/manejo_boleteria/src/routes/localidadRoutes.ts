import { Router } from "express";
import { LocalidadController } from "@/controllers/LocalidadController";
import { ValidatorJWT } from "@/middleware/ValidatorJWT";

const router = Router();
const localidadController = new LocalidadController();
// const validatorJWT = new ValidatorJWT().validateJWT;

// Rutas para localidades
router.get("/", localidadController.obtenerTodasLasLocalidades);
router.get("/buscar", localidadController.buscarLocalidadesPorNombre);
router.get("/:id", localidadController.obtenerLocalidadPorId);
router.post("/", localidadController.crearLocalidad);
router.put("/:id", localidadController.actualizarLocalidad);
router.delete("/:id", localidadController.eliminarLocalidad);

export default router;