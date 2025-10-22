import { Request, Response } from "express";
import { ApiResponse } from "@/utils/ApiResponse";
import { CompraService } from "@/services/CompraService";

export class CompraController {
    private readonly compraService: CompraService;

    constructor(){
        this.compraService = new CompraService();
    }

    obtenerTodasLasCompras = async (req: Request, res: Response): Promise<void> => {
        try {
            const eventos = await this.compraService.obtenerTodasLasCompras();
            res.status(200).json(ApiResponse.success("Compras obtenidas exitosamente", eventos));
        } catch (error) {
            console.error("Error al obtener eventos:", error);
            res.status(500).json(ApiResponse.error("Error al obtener las compras", error));
        }
    }


    registrarCompra = async (req: Request, res: Response): Promise<void> => {
        try {
            const compra = await this.compraService.registrarCompra(req.body);
            await this.compraService.descontarStockBoleteria(compra);
            res.status(201).json(ApiResponse.success("Compra registrada exitosamente", compra));
        } catch (error) {
            res.status(400).json(ApiResponse.error("Error al registrar compra", error));
        }
    };
}