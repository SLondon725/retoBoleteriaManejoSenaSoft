import { Request, Response } from "express";
import { LocalidadDetalleService } from "@/services/LocalidadDetalleService";
import { ApiResponse } from "@/utils/ApiResponse";

export class LocalidadDetalleController {
    private readonly localidadDetalleService: LocalidadDetalleService;

    constructor(){
        this.localidadDetalleService = new LocalidadDetalleService();
    }

    crearLocalidadDetalle = async (req: Request, res: Response): Promise<void> => {
        try {
            const localidadDetalle = await this.localidadDetalleService.crearLocalidadDetalle(req.body);
            res.status(201).json(ApiResponse.success("Localidad detalle creada exitosamente", localidadDetalle));
        } catch (error) {
            res.status(400).json(ApiResponse.error("Error al crear localidad detalle", error));
        }
    };

    obtenerTodosLosDetalles = async (req: Request, res: Response): Promise<void> => {
        try {
            const detalles = await this.localidadDetalleService.obtenerTodosLosDetalles();
            res.status(200).json(ApiResponse.success("Detalles obtenidos exitosamente", detalles));
        } catch (error) {
            console.error("Error al obtener detalles:", error);
            res.status(500).json(ApiResponse.error("Error al obtener los detalles", error));
        }
    };

    obtenerDetallePorId = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const detalle = await this.localidadDetalleService.obtenerDetallePorId(id);

            if (!detalle) {
                res.status(404).json(ApiResponse.errorValidacion("Detalle no encontrado"));
                return;
            }

            res.status(200).json(ApiResponse.success("Detalle obtenido exitosamente", detalle));
        } catch (error) {
            console.error("Error al obtener detalle:", error);
            res.status(500).json(ApiResponse.error("Error al obtener detalle", error));
        }
    };

    actualizarDetalle = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const detalle = await this.localidadDetalleService.actualizarDetalle(id, req.body);

            if (!detalle) {
                res.status(404).json(ApiResponse.errorValidacion("Detalle no encontrado"));
                return;
            }

            res.status(200).json(ApiResponse.success("Detalle actualizado exitosamente", detalle));
        } catch (error) {
            res.status(400).json(ApiResponse.error("Error al actualizar detalle", error));
        }
    };

    eliminarDetalle = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const eliminado = await this.localidadDetalleService.eliminarDetalle(id);

            if (!eliminado) {
                res.status(404).json(ApiResponse.errorValidacion("Detalle no encontrado"));
                return;
            }

            res.status(200).json(ApiResponse.success("Detalle eliminado exitosamente", null));
        } catch (error) {
            res.status(500).json(ApiResponse.error("Error al eliminar detalle", error));
        }
    };

    obtenerDetallesPorEvento = async (req: Request, res: Response): Promise<void> => {
        try {
            const idEvento = parseInt(req.params.idEvento);
            const detalles = await this.localidadDetalleService.obtenerDetallesPorEvento(idEvento);
            res.status(200).json(ApiResponse.success("Detalles por evento obtenidos exitosamente", detalles));
        } catch (error) {
            console.error("Error al obtener detalles por evento:", error);
            res.status(500).json(ApiResponse.error("Error al obtener detalles por evento", error));
        }
    };

    obtenerDetallesPorLocalidad = async (req: Request, res: Response): Promise<void> => {
        try {
            const idLocalidad = parseInt(req.params.idLocalidad);
            const detalles = await this.localidadDetalleService.obtenerDetallesPorLocalidad(idLocalidad);
            res.status(200).json(ApiResponse.success("Detalles por localidad obtenidos exitosamente", detalles));
        } catch (error) {
            console.error("Error al obtener detalles por localidad:", error);
            res.status(500).json(ApiResponse.error("Error al obtener detalles por localidad", error));
        }
    };

    obtenerDetallesDisponibles = async (req: Request, res: Response): Promise<void> => {
        try {
            const detalles = await this.localidadDetalleService.obtenerDetallesDisponibles();
            res.status(200).json(ApiResponse.success("Detalles disponibles obtenidos exitosamente", detalles));
        } catch (error) {
            console.error("Error al obtener detalles disponibles:", error);
            res.status(500).json(ApiResponse.error("Error al obtener detalles disponibles", error));
        }
    };

    actualizarCantidadDisponible = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const { cantidad } = req.body;
            
            if (cantidad === undefined || cantidad === null) {
                res.status(400).json(ApiResponse.errorValidacion("La cantidad es requerida"));
                return;
            }

            const detalle = await this.localidadDetalleService.actualizarCantidadDisponible(id, cantidad);

            if (!detalle) {
                res.status(404).json(ApiResponse.errorValidacion("Detalle no encontrado"));
                return;
            }

            res.status(200).json(ApiResponse.success("Cantidad disponible actualizada exitosamente", detalle));
        } catch (error) {
            console.error("Error al actualizar cantidad disponible:", error);
            res.status(500).json(ApiResponse.error("Error al actualizar cantidad disponible", error));
        }
    };
}
