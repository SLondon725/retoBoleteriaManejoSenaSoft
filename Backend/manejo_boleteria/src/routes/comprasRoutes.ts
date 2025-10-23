import { Router } from "express";
import { ComprasController } from "@/controllers/ComprasController";
import { ValidatorJWT } from "@/middleware/ValidatorJWT";

const router = Router();
const comprasController = new ComprasController();
const validatorJWT = new ValidatorJWT().validateJWT;

// Rutas para compras (requieren autenticación)
router.get("/", validatorJWT, comprasController.obtenerTodasLasCompras);
router.get("/usuario/:idUsuario", validatorJWT, comprasController.obtenerComprasPorUsuario);
router.get("/usuario/:idUsuario/historial", validatorJWT, comprasController.obtenerHistorialCompras);
router.get("/:id", validatorJWT, comprasController.obtenerCompraPorId);
router.post("/", validatorJWT, comprasController.crearCompra);
router.put("/:id", validatorJWT, comprasController.actualizarCompra);
router.delete("/:id", validatorJWT, comprasController.eliminarCompra);

export default router;
