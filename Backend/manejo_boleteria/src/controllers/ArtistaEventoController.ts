import { Request, Response } from "express";
import { ArtistaEventoService } from "@/services/ArtistaEventoService";
import { ApiResponse } from "@/utils/ApiResponse";

export class ArtistaEventoController {
    private readonly artistaEventoService: ArtistaEventoService;

    constructor(){
        this.artistaEventoService = new ArtistaEventoService();
    }

    obtenerArtistaEventos = async (req: Request, res: Response): Promise<void> => {
        try {
            const eventos = await this.artistaEventoService.obtenerArtistaEventos();
            res.status(200).json(ApiResponse.success("Datos obtenidos exitosamente", eventos));
        } catch (error) {
            res.status(400).json(ApiResponse.error("Error al traer los datos", error));
        }
    }

    asociarEvento = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log(req.body);
            const evento = await this.artistaEventoService.crearArtistaEvento(req.body);
            res.status(201).json(ApiResponse.success("Artista asociado exitosamente", evento));
        } catch (error) {
            res.status(400).json(ApiResponse.error("Error al asociar artista", error));
        }
    };

}
