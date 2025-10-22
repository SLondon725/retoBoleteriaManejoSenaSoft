import { Router } from "express";
import { EventoController } from "@/controllers/EventoController";
import { ValidatorJWT } from "@/middleware/ValidatorJWT";

const router = Router();
const eventoController = new EventoController();
// const validatorJWT = new ValidatorJWT().validateJWT;

// Rutas para eventos
router.get("/", eventoController.obtenerTodosLosEventos);
router.get("/proximos", eventoController.obtenerEventosProximos);
router.get("/municipio/:idMunicipio", eventoController.obtenerEventosPorMunicipio);
router.get("/estado/:idEstadoEvento", eventoController.obtenerEventosPorEstado);
router.get("/:id", eventoController.obtenerEventoPorId);
router.post("/", eventoController.crearEvento);
router.put("/:id", eventoController.actualizarEvento);
router.delete("/:id", eventoController.eliminarEvento);

export default router;