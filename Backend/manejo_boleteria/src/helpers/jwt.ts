import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Rol } from '@/entities/Rol';

dotenv.config();

export const generateToken = (id: any, nombre: string, apellido: string, email: string, rol: Rol) => {
    return new Promise((resolve, reject) => {
        const payload = { id, nombre, apellido, email, rol };

            jwt.sign(payload, process.env.SECRET_JWT_SEED || '', {
            expiresIn: '1h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject("No se pudo generar el token")
            }
            resolve(token);
        })
    })
}

export const decodeToken = (token: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_JWT_SEED || '', (error, decoded) => {
            if (error) {
                console.log(error);
                reject("No se pudo decodificar el token");
            }
            console.log(decoded);
            resolve(decoded);
        })
    })
}