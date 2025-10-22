import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { initializeDatabase } from './config/database';
import routes from './routes';

config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares de seguridad 
//app.use(helmet());

app.use(cors());

//Middlewares para parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Rutas
app.use('/manejo_boleteria', routes);

//Middleware de manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        date: null
    });
});

//Middleware para rutas no encontradas
app.use('/', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada',
        data: null
    }); 
});

//Inicializar el servidor 
const startServer = async () => {
    try {
        //Conectar a la base de datos
        await initializeDatabase();

        //Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor manejo boleteria ejecutandose en http://localhost:${PORT}`);
        });
    }catch (error){
        console.error('Error al inicar el servidor: ', error);
        process.exit(1);
    }
};

startServer();