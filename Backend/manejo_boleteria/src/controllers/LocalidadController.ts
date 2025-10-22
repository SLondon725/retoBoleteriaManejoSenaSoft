import { Request, Response } from "express";
import { LocalidadService } from "@/services/LocalidadService";
import { ApiResponse } from "@/utils/ApiResponse";

export class LocalidadController {
    private readonly localidadService: LocalidadService;

    constructor(){
        this.localidadService = new LocalidadService();
    }

    crearLocalidad = async (req: Request, res: Response): Promise<void> => {
        try {
            const localidad = await this.localidadService.crearLocalidad(req.body);
            res.status(201).json(ApiResponse.success("Localidad creada exitosamente", localidad));
        } catch (error) {
            res.status(400).json(ApiResponse.error("Error al crear localidad", error));
        }
    };

    obtenerTodasLasLocalidades = async (req: Request, res: Response): Promise<void> => {
        try {
            const localidades = await this.localidadService.obtenerTodasLasLocalidades();
            res.status(200).json(ApiResponse.success("Localidades obtenidas exitosamente", localidades));
        } catch (error) {
            console.error("Error al obtener localidades:", error);
            res.status(500).json(ApiResponse.error("Error al obtener las localidades", error));
        }
    };

    obtenerLocalidadPorId = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const localidad = await this.localidadService.obtenerLocalidadPorId(id);

            if (!localidad) {
                res.status(404).json(ApiResponse.errorValidacion("Localidad no encontrada"));
                return;
            }

            res.status(200).json(ApiResponse.success("Localidad obtenida exitosamente", localidad));
        } catch (error) {
            console.error("Error al obtener localidad:", error);
            res.status(500).json(ApiResponse.error("Error al obtener localidad", error));
        }
    };

    actualizarLocalidad = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const localidad = await this.localidadService.actualizarLocalidad(id, req.body);

            if (!localidad) {
                res.status(404).json(ApiResponse.errorValidacion("Localidad no encontrada"));
                return;
            }

            res.status(200).json(ApiResponse.success("Localidad actualizada exitosamente", localidad));
        } catch (error) {
            res.status(400).json(ApiResponse.error("Error al actualizar localidad", error));
        }
    };

    eliminarLocalidad = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const eliminada = await this.localidadService.eliminarLocalidad(id);

            if (!eliminada) {
                res.status(404).json(ApiResponse.errorValidacion("Localidad no encontrada"));
                return;
            }

            res.status(200).json(ApiResponse.success("Localidad eliminada exitosamente", null));
        } catch (error) {
            res.status(500).json(ApiResponse.error("Error al eliminar localidad", error));
        }
    };

    buscarLocalidadesPorNombre = async (req: Request, res: Response): Promise<void> => {
        try {
            const nombre = req.query.nombre as string;
            if (!nombre) {
                res.status(400).json(ApiResponse.errorValidacion("El parámetro nombre es requerido"));
                return;
            }
            const localidades = await this.localidadService.buscarLocalidadesPorNombre(nombre);
            res.status(200).json(ApiResponse.success("Localidades encontradas exitosamente", localidades));
        } catch (error) {
            console.error("Error al buscar localidades:", error);
            res.status(500).json(ApiResponse.error("Error al buscar localidades", error));
        }
    };
}
