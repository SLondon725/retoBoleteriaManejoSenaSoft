import { DataSource } from "typeorm";
import { config } from "dotenv";
import { Roles } from "@/entities/Roles";
import { Eventos } from "@/entities/Eventos";
import { Localidades } from "@/entities/Localidades";
import { Usuarios } from "@/entities/Usuarios";
import { GeneroMusical } from "@/entities/GeneroMusical";
import { ArtistaEventos } from "@/entities/ArtistaEventos";
import { LocalidadDetalle } from "@/entities/LocalidadDetalle";
import { Artistas } from "@/entities/Artistas";
import { Departamento } from "@/entities/Departamento";
import { Municipio } from "@/entities/Municipio";
import { EstadoEvento } from "@/entities/EstadoEvento";
import { EstadoTransaccion } from "@/entities/EstadoTransaccion";
import { MetodoPago } from "@/entities/MetodoPago";
import { Compras } from "@/entities/Compras";


config();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'manejo_boleteriabd',
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'false', //Compara las tablas locales con las almacenadas en entities y sincroniza
    logging: process.env.TYPEORM_LOGGING === 'false' ? ['query'] : false, //muestra las consultas generadas en consola

    entities: [Artistas, Usuarios, Roles, GeneroMusical, Eventos, Localidades, LocalidadDetalle, ArtistaEventos, EstadoEvento, EstadoTransaccion, MetodoPago, Municipio, Departamento, Compras]  
    //migrations: ['src/migrations/*.ts'] //controla el tema de las actualizaciones/sincronizaciones de la base de datos, es como una especie de git (?), y la direccion que se refleja ahi es donde se van a encontrar esas migraciones, igual el instructor dijo que no lo hibamos a usar pero pues, por si aca-
});

export const initializeDatabase = async (): Promise<void> =>{
    try{
        await AppDataSource.initialize();
        console.log('Base de datos conectada exitosamente!');
    }catch(error){
        console.error('Error al conectar con la base de datos:', error);
        throw error;
    }
}
