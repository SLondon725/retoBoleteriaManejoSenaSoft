import { Request, Response } from "express";
import { generateToken } from "../helpers/jwt";
import { UsuarioService } from "../services/UsuarioService";

export class AuthController{
    private readonly usuarioService;

    constructor(){
        this.usuarioService = new UsuarioService;
    }

    login = async (req: Request, res: Response) : Promise<void> => {
        const {id, password} = req.body;

        try{
            const user: any = await this.usuarioService.obtenerUsuarioPorId(id);
            if(!user){
                res.status(400).json({
                    code: 400, 
                    message: "Id o contraseña incorrectos"
                });
                return;
            }
            console.log(user);
            if(user.password !== password){
                res.status(401).json({
                    code: 401,
                    message: "Id o contraseña incorrectos"
                });
                return;
            }

            const token = await generateToken(user.id, user.nombre, user.apellido, user.email, user.rol);
            res.status(200).json({
                token
            });
        }catch(error){
            res.status(500).json({
                code: 500,
                message: "Internal server error"
            });
            return;
        }
    };  
}