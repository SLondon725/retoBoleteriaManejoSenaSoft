import { AppDataSource } from "@/config/database";
import { LocalidadDetalle } from "@/entities/LocalidadDetalle";
import { Localidades } from "@/entities/Localidades";
import { Eventos } from "@/entities/Eventos";
import { Repository } from "typeorm";

export class LocalidadDetalleService {
    private readonly localidadDetalleRepository: Repository<LocalidadDetalle>;
    private readonly localidadRepository: Repository<Localidades>;
    private readonly eventoRepository: Repository<Eventos>;

    constructor(){
        this.localidadDetalleRepository = AppDataSource.getRepository(LocalidadDetalle);
        this.localidadRepository = AppDataSource.getRepository(Localidades);
        this.eventoRepository = AppDataSource.getRepository(Eventos);
    }    

    async crearLocalidadDetalle(localidadDetalleData: Partial<LocalidadDetalle>): Promise<LocalidadDetalle> {
        
        // Verificar que la localidad existe
        const localidad = await this.localidadRepository.findOne({
            where: { idLocalidad: localidadDetalleData.idLocalidad }
        });

        if (!localidad) {
            throw new Error('La localidad especificada no existe');
        }

        // Verificar que el evento existe
        const evento = await this.eventoRepository.findOne({
            where: { idEvento: localidadDetalleData.idEvento }
        });

        if (!evento) {
            throw new Error('El evento especificado no existe');
        }

        // Verificar que no existe ya un detalle para esta localidad y evento
        const detalleExistente = await this.localidadDetalleRepository.findOne({
            where: { 
                idLocalidad: localidadDetalleData.idLocalidad,
                idEvento: localidadDetalleData.idEvento
            }
        });
        
        if (detalleExistente) {
            throw new Error('Ya existe un detalle para esta localidad en este evento');
        }

        const localidadDetalle = this.localidadDetalleRepository.create(localidadDetalleData);
        return await this.localidadDetalleRepository.save(localidadDetalle);
    }

    async obtenerTodosLosDetalles(): Promise<LocalidadDetalle[]> {
        return await this.localidadDetalleRepository.find({
            relations: ['idLocalidad2', 'idEvento2'],
            order: { valor: 'ASC' }
        });
    }

    async obtenerDetallePorId(id: number): Promise<LocalidadDetalle | null>{
        return await this.localidadDetalleRepository.findOne({
            where: { idLocalidadDetalle: id },
            relations: ['idLocalidad2', 'idEvento2', 'compras']
        });
    }

    async actualizarDetalle(id: number, detalleData: Partial<LocalidadDetalle>): Promise<LocalidadDetalle | null> {
        const detalle = await this.localidadDetalleRepository.findOne({
            where: { idLocalidadDetalle: id }
        });

        if (!detalle) {
            return null;
        }

        if (detalleData.idLocalidad && detalleData.idLocalidad !== detalle.idLocalidad) {
            const localidad = await this.localidadRepository.findOne({
                where: { idLocalidad: detalleData.idLocalidad }
            });

            if (!localidad) {
                throw new Error('La localidad especificada no existe');
            }
        }

        if (detalleData.idEvento && detalleData.idEvento !== detalle.idEvento) {
            const evento = await this.eventoRepository.findOne({
                where: { idEvento: detalleData.idEvento }
            });

            if (!evento) {
                throw new Error('El evento especificado no existe');
            }
        }

        // Verificar duplicados si se cambia localidad o evento
        if ((detalleData.idLocalidad && detalleData.idLocalidad !== detalle.idLocalidad) ||
            (detalleData.idEvento && detalleData.idEvento !== detalle.idEvento)) {
            
            const detalleExistente = await this.localidadDetalleRepository.findOne({
                where: { 
                    idLocalidad: detalleData.idLocalidad || detalle.idLocalidad,
                    idEvento: detalleData.idEvento || detalle.idEvento
                }
            });

            if (detalleExistente) {
                throw new Error('Ya existe un detalle para esta localidad en este evento');
            }
        }

        await this.localidadDetalleRepository.update(id, detalleData);
        return await this.obtenerDetallePorId(id);
    }

    async eliminarDetalle(id: number): Promise<boolean>{
        // Verificar si hay compras asociadas
        const compras = await AppDataSource.getRepository('compras').count({
            where: { idLocalidadDetalle: id }
        });

        if (compras > 0) {
            throw new Error('No se puede eliminar el detalle porque tiene compras asociadas');
        }

        const resultado = await this.localidadDetalleRepository.delete(id);
        return resultado.affected !== 0;
    }

    async obtenerDetallesPorEvento(idEvento: number): Promise<LocalidadDetalle[]>{
        return await this.localidadDetalleRepository.find({
            where: { idEvento },
            relations: ['idLocalidad2', 'idEvento2'],
            order: { valor: 'ASC' }
        });
    }

    async obtenerDetallesPorLocalidad(idLocalidad: number): Promise<LocalidadDetalle[]>{
        return await this.localidadDetalleRepository.find({
            where: { idLocalidad },
            relations: ['idLocalidad2', 'idEvento2'],
            order: { valor: 'ASC' }
        });
    }

    async obtenerDetallesDisponibles(): Promise<LocalidadDetalle[]>{
        return await this.localidadDetalleRepository
            .createQueryBuilder('detalle')
            .leftJoinAndSelect('detalle.idLocalidad2', 'localidad')
            .leftJoinAndSelect('detalle.idEvento2', 'evento')
            .where('detalle.cantidadDisponible > 0')
            .orderBy('detalle.valor', 'ASC')
            .getMany();
    }

    async actualizarCantidadDisponible(id: number, cantidad: number): Promise<LocalidadDetalle | null> {
        const detalle = await this.localidadDetalleRepository.findOne({
            where: { idLocalidadDetalle: id }
        });

        if (!detalle) {
            return null;
        }

        if (cantidad < 0) {
            throw new Error('La cantidad no puede ser negativa');
        }

        await this.localidadDetalleRepository.update(id, { cantidadDisponible: cantidad });
        return await this.obtenerDetallePorId(id);
    }
}
