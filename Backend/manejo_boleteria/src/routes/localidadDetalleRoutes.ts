import { Router } from "express";
import { LocalidadDetalleController } from "@/controllers/LocalidadDetalleController";
import { ValidatorJWT } from "@/middleware/ValidatorJWT";

const router = Router();
const localidadDetalleController = new LocalidadDetalleController();
// const validatorJWT = new ValidatorJWT().validateJWT;

// Rutas para localidades detalle
router.get("/", localidadDetalleController.obtenerTodosLosDetalles);
router.get("/disponibles", localidadDetalleController.obtenerDetallesDisponibles);
router.get("/evento/:idEvento", localidadDetalleController.obtenerDetallesPorEvento);
router.get("/localidad/:idLocalidad", localidadDetalleController.obtenerDetallesPorLocalidad);
router.get("/:id", localidadDetalleController.obtenerDetallePorId);
router.post("/", localidadDetalleController.crearLocalidadDetalle);
router.put("/:id", localidadDetalleController.actualizarDetalle);
router.put("/:id/cantidad", localidadDetalleController.actualizarCantidadDisponible);
router.delete("/:id", localidadDetalleController.eliminarDetalle);

export default router;