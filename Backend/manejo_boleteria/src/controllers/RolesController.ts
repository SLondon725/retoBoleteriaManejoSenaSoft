import { Request, Response } from "express";
import { RolesService } from "@/services/RolesService";
import { ApiResponse } from "@/utils/ApiResponse";

export class RolesController {
    private readonly rolesService: RolesService;

    constructor(){
        this.rolesService = new RolesService();
    }

    crearRol = async (req: Request, res: Response): Promise<void> => {
        try {
            const rol = await this.rolesService.crearRol(req.body);
            res.status(201).json(ApiResponse.success("Rol creado exitosamente", rol));
        } catch (error) {
            res.status(400).json(ApiResponse.error("Error al crear rol", error));
        }
    };

    obtenerTodosLosRoles = async (req: Request, res: Response): Promise<void> => {
        try {
            const roles = await this.rolesService.obtenerTodosLosRoles();
            res.status(200).json(ApiResponse.success("Roles obtenidos exitosamente", roles));
        } catch (error) {
            console.error("Error al obtener roles:", error);
            res.status(500).json(ApiResponse.error("Error al obtener los roles", error));
        }
    };

    obtenerRolPorId = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const rol = await this.rolesService.obtenerRolPorId(id);

            if (!rol) {
                res.status(404).json(ApiResponse.errorValidacion("Rol no encontrado"));
                return;
            }

            res.status(200).json(ApiResponse.success("Rol obtenido exitosamente", rol));
        } catch (error) {
            console.error("Error al obtener rol:", error);
            res.status(500).json(ApiResponse.error("Error al obtener rol", error));
        }
    };

    actualizarRol = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const rol = await this.rolesService.actualizarRol(id, req.body);

            if (!rol) {
                res.status(404).json(ApiResponse.errorValidacion("Rol no encontrado"));
                return;
            }

            res.status(200).json(ApiResponse.success("Rol actualizado exitosamente", rol));
        } catch (error) {
            res.status(400).json(ApiResponse.error("Error al actualizar rol", error));
        }
    };

    eliminarRol = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const eliminado = await this.rolesService.eliminarRol(id);

            if (!eliminado) {
                res.status(404).json(ApiResponse.errorValidacion("Rol no encontrado"));
                return;
            }

            res.status(200).json(ApiResponse.success("Rol eliminado exitosamente", null));
        } catch (error) {
            res.status(500).json(ApiResponse.error("Error al eliminar rol", error));
        }
    };

    buscarRolesPorNombre = async (req: Request, res: Response): Promise<void> => {
        try {
            const nombre = req.query.nombre as string;
            if (!nombre) {
                res.status(400).json(ApiResponse.errorValidacion("El parámetro nombre es requerido"));
                return;
            }
            const roles = await this.rolesService.buscarRolesPorNombre(nombre);
            res.status(200).json(ApiResponse.success("Roles encontrados exitosamente", roles));
        } catch (error) {
            console.error("Error al buscar roles:", error);
            res.status(500).json(ApiResponse.error("Error al buscar roles", error));
        }
    };

    obtenerUsuariosPorRol = async (req: Request, res: Response): Promise<void> => {
        try {
            const idRol = parseInt(req.params.idRol);
            const rol = await this.rolesService.obtenerUsuariosPorRol(idRol);

            if (!rol) {
                res.status(404).json(ApiResponse.errorValidacion("Rol no encontrado"));
                return;
            }

            res.status(200).json(ApiResponse.success("Usuarios por rol obtenidos exitosamente", rol));
        } catch (error) {
            console.error("Error al obtener usuarios por rol:", error);
            res.status(500).json(ApiResponse.error("Error al obtener usuarios por rol", error));
        }
    };
}
