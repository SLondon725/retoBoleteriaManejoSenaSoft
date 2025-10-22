import { Request, Response } from "express";
import { UsuarioService } from "@/services/UsuarioService";
import { ApiResponse } from "@/utils/ApiResponse";


export class UsuarioController {
    private readonly usuarioService : UsuarioService;

    constructor(){
        this.usuarioService = new UsuarioService;
    }

    crearUsuario = async (req: Request, res: Response): Promise<void> => {
        try {
          const usuario = await this.usuarioService.crearUsuario(req.body);
          res.status(201).json(ApiResponse.success("Usuario creado exitosamente", usuario));
        } catch (error) {
          res.status(400).json(ApiResponse.error("Error al crear usuario", error));
        }
      };
    
      obtenerTodosLosUsuarios = async (req: Request, res: Response): Promise<void> => {
        try {
          const usuarios = await this.usuarioService.obtenerTodosLosUsuarios();
          res.status(200).json(ApiResponse.success("Usuarios obtenidos exitosamente", usuarios));
        } catch (error) {
          console.error("Error al obtener usuarios:", error);
          res.status(500).json(ApiResponse.error("Error al obtener los usuarios", error));
        }
      };
    
      obtenerUsuarioPorId = async (req: Request, res: Response): Promise<void> => {
        try {
          const numIdentificacion = req.params.numIdentificacion;
          const usuario = await this.usuarioService.obtenerUsuarioPorId(numIdentificacion);
    
          if (!usuario) {
            res.status(404).json(ApiResponse.errorValidacion("Usuario no encontrado"));
            return;
          }
    
          res.status(200).json(ApiResponse.success("Usuario obtenido exitosamente", usuario));
        } catch (error) {
          console.error("Error al obtener usuario:", error);
          res.status(500).json(ApiResponse.error("Error al obtener usuario", error));
        }
      };
    
      actualizarUsuario = async (req: Request, res: Response): Promise<void> => {
        try {
          const numIdentificacion = req.params.numIdentificacion;
          const usuario = await this.usuarioService.actualizarUsuario(numIdentificacion, req.body);
    
          if (!usuario) {
            res.status(404).json(ApiResponse.errorValidacion("Usuario no encontrado"));
            return;
          }
    
          res.status(200).json(ApiResponse.success("Usuario actualizado exitosamente", usuario));
        } catch (error) {
          res.status(400).json(ApiResponse.error("Error al actualizar usuario", error));
        }
      };
    
      eliminarUsuario = async (req: Request, res: Response): Promise<void> => {
        try {
          const numIdentificacion = req.params.numIdentificacion;
          const eliminado = await this.usuarioService.eliminarUsuario(numIdentificacion);
    
          if (!eliminado) {
            res.status(404).json(ApiResponse.errorValidacion("Usuario no encontrado"));
            return;
          }
    
          res.status(200).json(ApiResponse.success("Usuario eliminado exitosamente", null));
        } catch (error) {
          res.status(500).json(ApiResponse.error("Error al eliminar usuario", error));
        }
      };
    
      obtenerUsuariosPorRol = async (req: Request, res: Response): Promise<void> => {
        try {
          const idRol = parseInt(req.params.idRol);
          const usuarios = await this.usuarioService.obtenerUsuariosPorRol(idRol);
          res.status(200).json(ApiResponse.success("Usuarios por rol obtenidos exitosamente", usuarios));
        } catch (error) {
          console.error("Error al obtener usuarios por rol:", error);
          res.status(500).json(ApiResponse.error("Error al obtener usuarios por rol", error));
        }
      };

      obtenerUsuarioPorCorreo = async (req: Request, res: Response): Promise<void> => {
        try {
          const correo = req.params.correo;
          const usuario = await this.usuarioService.obtenerUsuarioPorCorreo(correo);
    
          if (!usuario) {
            res.status(404).json(ApiResponse.errorValidacion("Usuario no encontrado"));
            return;
          }
    
          res.status(200).json(ApiResponse.success("Usuario obtenido exitosamente", usuario));
        } catch (error) {
          console.error("Error al obtener usuario por correo:", error);
          res.status(500).json(ApiResponse.error("Error al obtener usuario por correo", error));
        }
      };

      buscarUsuariosPorNombre = async (req: Request, res: Response): Promise<void> => {
        try {
          const nombre = req.query.nombre as string;
          if (!nombre) {
            res.status(400).json(ApiResponse.errorValidacion("El parámetro nombre es requerido"));
            return;
          }
          const usuarios = await this.usuarioService.buscarUsuariosPorNombre(nombre);
          res.status(200).json(ApiResponse.success("Usuarios encontrados exitosamente", usuarios));
        } catch (error) {
          console.error("Error al buscar usuarios:", error);
          res.status(500).json(ApiResponse.error("Error al buscar usuarios", error));
        }
      };

      verificarCredenciales = async (req: Request, res: Response): Promise<void> => {
        try {
          const { correo, pass } = req.body;
          const usuario = await this.usuarioService.verificarCredenciales(correo, pass);
    
          if (!usuario) {
            res.status(401).json(ApiResponse.errorValidacion("Credenciales incorrectas"));
            return;
          }
    
          res.status(200).json(ApiResponse.success("Credenciales verificadas exitosamente", usuario));
        } catch (error) {
          console.error("Error al verificar credenciales:", error);
          res.status(500).json(ApiResponse.error("Error al verificar credenciales", error));
        }
      };

      cambiarPassword = async (req: Request, res: Response): Promise<void> => {
        try {
          const numIdentificacion = req.params.numIdentificacion;
          const { nuevaPassword } = req.body;
          
          if (!nuevaPassword) {
            res.status(400).json(ApiResponse.errorValidacion("La nueva contraseña es requerida"));
            return;
          }

          const usuario = await this.usuarioService.cambiarPassword(numIdentificacion, nuevaPassword);
    
          if (!usuario) {
            res.status(404).json(ApiResponse.errorValidacion("Usuario no encontrado"));
            return;
          }
    
          res.status(200).json(ApiResponse.success("Contraseña cambiada exitosamente", null));
        } catch (error) {
          console.error("Error al cambiar contraseña:", error);
          res.status(500).json(ApiResponse.error("Error al cambiar contraseña", error));
        }
      };

}