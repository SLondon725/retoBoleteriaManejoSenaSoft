import { Router } from "express";
import { ArtistaController } from "@/controllers/ArtistaController";
import { ValidatorJWT } from "@/middleware/ValidatorJWT";

const router = Router();
const artistaController = new ArtistaController();
// const validatorJWT = new ValidatorJWT().validateJWT;

// Rutas para artistas
router.get("/", artistaController.obtenerTodosLosArtistas);
router.get("/genero/:idGeneroMusical", artistaController.obtenerArtistasPorGenero);
router.get("/municipio/:idMunicipio", artistaController.obtenerArtistasPorMunicipio);
router.get("/:id", artistaController.obtenerArtistaPorId);
router.post("/", artistaController.crearArtista);
router.put("/:id", artistaController.actualizarArtista);
router.delete("/:id", artistaController.eliminarArtista);

export default router;