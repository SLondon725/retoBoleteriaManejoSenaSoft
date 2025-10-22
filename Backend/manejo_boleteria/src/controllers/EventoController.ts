import { Request, Response } from "express";
import { EventoService } from "@/services/EventoService";
import { ApiResponse } from "@/utils/ApiResponse";

export class EventoController {
    private readonly eventoService: EventoService;

    constructor(){
        this.eventoService = new EventoService();
    }

    crearEvento = async (req: Request, res: Response): Promise<void> => {
        try {
            const evento = await this.eventoService.crearEvento(req.body);
            res.status(201).json(ApiResponse.success("Evento creado exitosamente", evento));
        } catch (error) {
            res.status(400).json(ApiResponse.error("Error al crear evento", error));
        }
    };

    obtenerTodosLosEventos = async (req: Request, res: Response): Promise<void> => {
        try {
            const eventos = await this.eventoService.obtenerTodosLosEventos();
            res.status(200).json(ApiResponse.success("Eventos obtenidos exitosamente", eventos));
        } catch (error) {
            console.error("Error al obtener eventos:", error);
            res.status(500).json(ApiResponse.error("Error al obtener los eventos", error));
        }
    };

    obtenerEventoPorId = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const evento = await this.eventoService.obtenerEventoPorId(id);

            if (!evento) {
                res.status(404).json(ApiResponse.errorValidacion("Evento no encontrado"));
                return;
            }

            res.status(200).json(ApiResponse.success("Evento obtenido exitosamente", evento));
        } catch (error) {
            
            console.error("Error al obtener evento:", error);
            res.status(500).json(ApiResponse.error("Error al obtener evento", error));
        }
    };

    actualizarEvento = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const evento = await this.eventoService.actualizarEvento(id, req.body);

            if (!evento) {
                res.status(404).json(ApiResponse.errorValidacion("Evento no encontrado"));
                return;
            }

            res.status(200).json(ApiResponse.success("Evento actualizado exitosamente", evento));
        } catch (error) {
            res.status(400).json(ApiResponse.error("Error al actualizar evento", error));
        }
    };

    eliminarEvento = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const eliminado = await this.eventoService.eliminarEvento(id);

            if (!eliminado) {
                res.status(404).json(ApiResponse.errorValidacion("Evento no encontrado"));
                return;
            }

            res.status(200).json(ApiResponse.success("Evento eliminado exitosamente", null));
        } catch (error) {
            res.status(500).json(ApiResponse.error("Error al eliminar evento", error));
        }
    };

    obtenerEventosPorMunicipio = async (req: Request, res: Response): Promise<void> => {
        try {
            const idMunicipio = parseInt(req.params.idMunicipio);
            const eventos = await this.eventoService.obtenerEventosPorMunicipio(idMunicipio);
            res.status(200).json(ApiResponse.success("Eventos por municipio obtenidos exitosamente", eventos));
        } catch (error) {
            console.error("Error al obtener eventos por municipio:", error);
            res.status(500).json(ApiResponse.error("Error al obtener eventos por municipio", error));
        }
    };

    obtenerEventosPorEstado = async (req: Request, res: Response): Promise<void> => {
        try {
            const idEstadoEvento = parseInt(req.params.idEstadoEvento);
            const eventos = await this.eventoService.obtenerEventosPorEstado(idEstadoEvento);
            res.status(200).json(ApiResponse.success("Eventos por estado obtenidos exitosamente", eventos));
        } catch (error) {
            console.error("Error al obtener eventos por estado:", error);
            res.status(500).json(ApiResponse.error("Error al obtener eventos por estado", error));
        }
    };

    obtenerEventosProximos = async (req: Request, res: Response): Promise<void> => {
        try {
            const eventos = await this.eventoService.obtenerEventosProximos();
            res.status(200).json(ApiResponse.success("Eventos próximos obtenidos exitosamente", eventos));
        } catch (error) {
            console.error("Error al obtener eventos próximos:", error);
            res.status(500).json(ApiResponse.error("Error al obtener eventos próximos", error));
        }
    };
}
