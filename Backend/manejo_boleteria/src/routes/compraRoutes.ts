import { Router } from "express";
import { CompraController } from "@/controllers/CompraController";
import { ValidatorJWT } from "@/middleware/ValidatorJWT";

const router = Router();
const compraController = new CompraController;
// const validatorJWT = new ValidatorJWT().validateJWT;

router.get("/", compraController.obtenerTodasLasCompras);
router.post("/", compraController.registrarCompra);

export default router;