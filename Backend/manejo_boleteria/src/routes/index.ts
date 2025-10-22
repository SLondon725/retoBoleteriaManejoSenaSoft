import { Router, Request, Response } from "express";
import usuarioRoutes from './usuarioRoutes';
import routerAuth from "./authRoutes";
import artistaRoutes from './artistaRoutes';
import eventoRoutes from './eventoRoutes';
import localidadRoutes from './localidadRoutes';
import localidadDetalleRoutes from './localidadDetalleRoutes';
import rolesRoutes from './rolesRoutes';

const router = Router();

// Rutas principales
router.use('/usuarios', usuarioRoutes);
router.use('/roles', rolesRoutes);
router.use('/auth', routerAuth);
router.use('/artistas', artistaRoutes);
router.use('/eventos', eventoRoutes);
router.use('/localidades', localidadRoutes);
router.use('/localidades-detalle', localidadDetalleRoutes);

// Ruta de salud del servidor 
router.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Servidor funcionando correctamente',
        timeStamp: new Date().toISOString()
    });
});

// Ruta de información de la API
router.get('/info', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'API de Manejo de Boletería',
        endpoints: {
            usuarios: '/usuarios',
            roles: '/roles',
            auth: '/auth',
            artistas: '/artistas',
            eventos: '/eventos',
            localidades: '/localidades',
            localidadesDetalle: '/localidades-detalle',
            rolesNuevo: '/roles-nuevo'
        }
    });
});

export default router;