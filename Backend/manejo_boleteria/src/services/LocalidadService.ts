import { AppDataSource } from "@/config/database";
import { Localidades } from "@/entities/Localidades";
import { Repository } from "typeorm";

export class LocalidadService {
    private readonly localidadRepository: Repository<Localidades>;

    constructor(){
        this.localidadRepository = AppDataSource.getRepository(Localidades);
    }    

    async crearLocalidad(localidadData: Partial<Localidades>): Promise<Localidades> {
        
        const localidadExistente = await this.localidadRepository.findOne({
            where: { nombre: localidadData.nombre }
        });
        
        if (localidadExistente) {
            throw new Error('El nombre de la localidad ya está en uso');
        }

        const localidad = this.localidadRepository.create(localidadData);
        return await this.localidadRepository.save(localidad);
    }

    async obtenerTodasLasLocalidades(): Promise<Localidades[]> {
        return await this.localidadRepository.find({
            relations: ['localidadDetalles'],
            order: { nombre: 'ASC' }
        });
    }

    async obtenerLocalidadPorId(id: number): Promise<Localidades | null>{
        return await this.localidadRepository.findOne({
            where: { idLocalidad: id },
            relations: ['localidadDetalles']
        });
    }

    async actualizarLocalidad(id: number, localidadData: Partial<Localidades>): Promise<Localidades | null> {
        const localidad = await this.localidadRepository.findOne({
            where: { idLocalidad: id }
        });

        if (!localidad) {
            return null;
        }

        if (localidadData.nombre && localidadData.nombre !== localidad.nombre) {
            const localidadExistente = await this.localidadRepository.findOne({
                where: { nombre: localidadData.nombre }
            });

            if (localidadExistente) {
                throw new Error('El nombre de la localidad ya está en uso');
            }
        }

        await this.localidadRepository.update(id, localidadData);
        return await this.obtenerLocalidadPorId(id);
    }

    async eliminarLocalidad(id: number): Promise<boolean>{
        // Verificar si hay localidades detalle asociadas
        const localidadesDetalle = await AppDataSource.getRepository('localidad_detalle').count({
            where: { idLocalidad: id }
        });

        if (localidadesDetalle > 0) {
            throw new Error('No se puede eliminar la localidad porque tiene detalles asociados');
        }

        const resultado = await this.localidadRepository.delete(id);
        return resultado.affected !== 0;
    }

    async buscarLocalidadesPorNombre(nombre: string): Promise<Localidades[]>{
        return await this.localidadRepository
            .createQueryBuilder('localidad')
            .leftJoinAndSelect('localidad.localidadDetalles', 'localidadDetalle')
            .where('localidad.nombre ILIKE :nombre', { nombre: `%${nombre}%` })
            .orderBy('localidad.nombre', 'ASC')
            .getMany();
    }
}
