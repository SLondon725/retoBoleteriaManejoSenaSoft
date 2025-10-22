import { Router } from "express";
import { ArtistaEventoController } from "@/controllers/ArtistaEventoController";
import { ValidatorJWT } from "@/middleware/ValidatorJWT";

const router = Router();
const artistaEventoController = new ArtistaEventoController();
// const validatorJWT = new ValidatorJWT().validateJWT;

router.post("/", artistaEventoController.asociarEvento);

export default router;