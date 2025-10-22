import jwt, {JwtPayload} from 'jsonwebtoken';

export class ValidatorJWT{
    validateJWT = (req: any, res: any, next: any) => {
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({
                code: 401,
                message: 'No se ha proporcionado un token'
            });
        }
        try{
            const payload = jwt.verify(
                token, 
                process.env.SECRET_JWT_SEED || ''
            );
            req.id = (payload as JwtPayload).id;
            req.nombre = (payload as JwtPayload).nombre;
            
        }catch(error){
            res.status(401).json({
                code: 401,
                message: 'Token no valido'
            });
        }
        
        next(); 
    }
}