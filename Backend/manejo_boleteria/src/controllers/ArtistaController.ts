import { Request, Response } from "express";
import { ArtistaService } from "@/services/ArtistaService";
import { ApiResponse } from "@/utils/ApiResponse";

export class ArtistaController {
    private readonly artistaService: ArtistaService;

    constructor(){
        this.artistaService = new ArtistaService();
    }

    crearArtista = async (req: Request, res: Response): Promise<void> => {
        try {
            const artista = await this.artistaService.crearArtista(req.body);
            res.status(201).json(ApiResponse.success("Artista creado exitosamente", artista));
        } catch (error) {
            res.status(400).json(ApiResponse.error("Error al crear artista", error));
        }
    };

    obtenerTodosLosArtistas = async (req: Request, res: Response): Promise<void> => {
        try {
            const artistas = await this.artistaService.obtenerTodosLosArtistas();
            res.status(200).json(ApiResponse.success("Artistas obtenidos exitosamente", artistas));
        } catch (error) {
            console.error("Error al obtener artistas:", error);
            res.status(500).json(ApiResponse.error("Error al obtener los artistas", error));
        }
    };

    obtenerArtistaPorId = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const artista = await this.artistaService.obtenerArtistaPorId(id);

            if (!artista) {
                res.status(404).json(ApiResponse.errorValidacion("Artista no encontrado"));
                return;
            }

            res.status(200).json(ApiResponse.success("Artista obtenido exitosamente", artista));
        } catch (error) {
            console.error("Error al obtener artista:", error);
            res.status(500).json(ApiResponse.error("Error al obtener artista", error));
        }
    };

    actualizarArtista = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const artista = await this.artistaService.actualizarArtista(id, req.body);

            if (!artista) {
                res.status(404).json(ApiResponse.errorValidacion("Artista no encontrado"));
                return;
            }

            res.status(200).json(ApiResponse.success("Artista actualizado exitosamente", artista));
        } catch (error) {
            res.status(400).json(ApiResponse.error("Error al actualizar artista", error));
        }
    };

    eliminarArtista = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const eliminado = await this.artistaService.eliminarArtista(id);

            if (!eliminado) {
                res.status(404).json(ApiResponse.errorValidacion("Artista no encontrado"));
                return;
            }

            res.status(200).json(ApiResponse.success("Artista eliminado exitosamente", null));
        } catch (error) {
            res.status(500).json(ApiResponse.error("Error al eliminar artista", error));
        }
    };

    obtenerArtistasPorGenero = async (req: Request, res: Response): Promise<void> => {
        try {
            const idGeneroMusical = parseInt(req.params.idGeneroMusical);
            const artistas = await this.artistaService.obtenerArtistasPorGenero(idGeneroMusical);
            res.status(200).json(ApiResponse.success("Artistas por género obtenidos exitosamente", artistas));
        } catch (error) {
            console.error("Error al obtener artistas por género:", error);
            res.status(500).json(ApiResponse.error("Error al obtener artistas por género", error));
        }
    };

    obtenerArtistasPorMunicipio = async (req: Request, res: Response): Promise<void> => {
        try {
            const idMunicipio = parseInt(req.params.idMunicipio);
            const artistas = await this.artistaService.obtenerArtistasPorMunicipio(idMunicipio);
            res.status(200).json(ApiResponse.success("Artistas por municipio obtenidos exitosamente", artistas));
        } catch (error) {
            console.error("Error al obtener artistas por municipio:", error);
            res.status(500).json(ApiResponse.error("Error al obtener artistas por municipio", error));
        }
    };
}
