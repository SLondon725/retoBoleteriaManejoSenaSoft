import { Request, Response } from "express";
import { ComprasService } from "@/services/ComprasService";
import { ApiResponse } from "@/utils/ApiResponse";

export class ComprasController {
    private readonly comprasService: ComprasService;

    constructor(){
        this.comprasService = new ComprasService();
    }

    crearCompra = async (req: Request, res: Response): Promise<void> => {
        try {
            const compra = await this.comprasService.crearCompra(req.body);
            res.status(201).json(ApiResponse.success("Compra realizada exitosamente", compra));
        } catch (error) {
            res.status(400).json(ApiResponse.error("Error al realizar la compra", error));
        }
    };

    obtenerTodasLasCompras = async (req: Request, res: Response): Promise<void> => {
        try {
            const compras = await this.comprasService.obtenerTodasLasCompras();
            res.status(200).json(ApiResponse.success("Compras obtenidas exitosamente", compras));
        } catch (error) {
            console.error("Error al obtener compras:", error);
            res.status(500).json(ApiResponse.error("Error al obtener las compras", error));
        }
    };

    obtenerCompraPorId = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const compra = await this.comprasService.obtenerCompraPorId(id);

            if (!compra) {
                res.status(404).json(ApiResponse.errorValidacion("Compra no encontrada"));
                return;
            }

            res.status(200).json(ApiResponse.success("Compra obtenida exitosamente", compra));
        } catch (error) {
            console.error("Error al obtener compra:", error);
            res.status(500).json(ApiResponse.error("Error al obtener compra", error));
        }
    };

    obtenerComprasPorUsuario = async (req: Request, res: Response): Promise<void> => {
        try {
            const idUsuario = req.params.idUsuario;
            const compras = await this.comprasService.obtenerComprasPorUsuario(idUsuario);
            res.status(200).json(ApiResponse.success("Compras del usuario obtenidas exitosamente", compras));
        } catch (error) {
            console.error("Error al obtener compras del usuario:", error);
            res.status(500).json(ApiResponse.error("Error al obtener compras del usuario", error));
        }
    };

    obtenerHistorialCompras = async (req: Request, res: Response): Promise<void> => {
        try {
            const idUsuario = req.params.idUsuario;
            const { evento, fechaInicio, fechaFin } = req.query;

            let compras;

            if (evento) {
                compras = await this.comprasService.buscarComprasPorEvento(parseInt(evento as string));
            } else if (fechaInicio && fechaFin) {
                compras = await this.comprasService.buscarComprasPorFecha(
                    fechaInicio as string, 
                    fechaFin as string
                );
            } else {
                compras = await this.comprasService.obtenerComprasPorUsuario(idUsuario);
            }

            res.status(200).json(ApiResponse.success("Historial de compras obtenido exitosamente", compras));
        } catch (error) {
            console.error("Error al obtener historial de compras:", error);
            res.status(500).json(ApiResponse.error("Error al obtener historial de compras", error));
        }
    };

    actualizarCompra = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const compra = await this.comprasService.actualizarCompra(id, req.body);

            if (!compra) {
                res.status(404).json(ApiResponse.errorValidacion("Compra no encontrada"));
                return;
            }

            res.status(200).json(ApiResponse.success("Compra actualizada exitosamente", compra));
        } catch (error) {
            res.status(400).json(ApiResponse.error("Error al actualizar compra", error));
        }
    };

    eliminarCompra = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const eliminado = await this.comprasService.eliminarCompra(id);

            if (!eliminado) {
                res.status(404).json(ApiResponse.errorValidacion("Compra no encontrada"));
                return;
            }

            res.status(200).json(ApiResponse.success("Compra eliminada exitosamente", null));
        } catch (error) {
            res.status(500).json(ApiResponse.error("Error al eliminar compra", error));
        }
    };
}
