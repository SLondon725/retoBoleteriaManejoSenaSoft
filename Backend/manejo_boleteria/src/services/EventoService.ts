import { AppDataSource } from "@/config/database";
import { Repository } from "typeorm";
import { Eventos } from "@/entities/Eventos";
import { Municipio } from "@/entities/Municipio";
import { EstadoEvento } from "@/entities/EstadoEvento";

export class EventoService {
    private readonly eventoRepository: Repository<Eventos>;
    private readonly municipioRepository: Repository<Municipio>;
    private readonly estadoEventoRepository: Repository<EstadoEvento>;

    constructor(){
        this.eventoRepository = AppDataSource.getRepository(Eventos);
        this.municipioRepository = AppDataSource.getRepository(Municipio);
        this.estadoEventoRepository = AppDataSource.getRepository(EstadoEvento);
    }    

    async crearEvento(eventoData: Partial<Eventos>): Promise<Eventos> {
        
        // Verificar que el municipio existe
        const municipio = await this.municipioRepository.findOne({
            where: { idMunicipio: eventoData.idMunicipio }
        });

        if (!municipio) {
            throw new Error('El municipio especificado no existe');
        }

        // Verificar que el estado del evento existe
        const estadoEvento = await this.estadoEventoRepository.findOne({
            where: { idEstadoEvento: eventoData.idEstadoEvento }
        });

        if (!estadoEvento) {
            throw new Error('El estado del evento especificado no existe');
        }
        
        const eventoExistente = await this.eventoRepository.findOne({
            where: { nombre: eventoData.nombre }
        });
        
        if (eventoExistente) {
            throw new Error('El nombre del evento ya está en uso');
        }

        const evento = this.eventoRepository.create(eventoData);
        return await this.eventoRepository.save(evento);
    }

    async buscarEventosPorFiltros(filtros: {
        fecha?: string,
        idMunicipio?: number,
        idDepartamento?: number,
    }): Promise<Eventos[]> {
        const query = this.eventoRepository.createQueryBuilder('eventos');
    
        query
          .leftJoinAndSelect('evento.artistaEventos', 'artistaEvento')
          .leftJoinAndSelect('artistaEvento.artista', 'artista')
          .leftJoinAndSelect('evento.localidadDetalles', 'localidad')
          .leftJoinAndSelect('evento.idMunicipio2', 'municipio')
          .leftJoinAndSelect('municipio.idDepartamento2', 'departamento'); // Asumiendo que 'Municipio' tiene una relación con 'Departamento'
    
        // Aplica los filtros de manera condicional
        if (filtros.fecha) {
          query.andWhere('evento.fechaInicio = :fecha', { fecha: filtros.fecha });
        }
    
        if (filtros.idMunicipio) {
          query.andWhere('evento.id_municipio = :idMunicipio', { idMunicipio: filtros.idMunicipio });
        }
    
        if (filtros.idDepartamento) {
          query.andWhere('departamento.idDepartamento = :idDepartamento', { idDepartamento: filtros.idDepartamento });
        }
        
        // Agrega la lógica para solo mostrar eventos futuros
        query.andWhere('evento.fechaFin >= CURDATE()');
    
        // Ejecuta y retorna la consulta
        return await query.getMany();
      }

    async obtenerTodosLosEventos(): Promise<Eventos[]> {
        return await this.eventoRepository.find({
            where: {idEstadoEvento: 1},
            relations: ['idMunicipio2', 'idEstadoEvento2'],
            order: { fechaInicio: 'DESC' }
        }); 
    }

    async obtenerEventoPorId(id: number): Promise<Eventos | null>{
        return await this.eventoRepository.findOne({
            where: { idEvento: id },
            relations: ['idMunicipio2', 'idEstadoEvento2', 'artistaEventos', 'localidadDetalles']
        });
    }

    async actualizarEvento(id: number, eventoData: Partial<Eventos>): Promise<Eventos | null> {
        const evento = await this.eventoRepository.findOne({
            where: { idEvento: id }
        });

        if (!evento) {
            return null;
        }

        if (eventoData.idMunicipio && eventoData.idMunicipio !== evento.idMunicipio) {
            const municipio = await this.municipioRepository.findOne({
                where: { idMunicipio: eventoData.idMunicipio }
            });

            if (!municipio) {
                throw new Error('El municipio especificado no existe');
            }
        }

        if (eventoData.idEstadoEvento && eventoData.idEstadoEvento !== evento.idEstadoEvento) {
            const estadoEvento = await this.estadoEventoRepository.findOne({
                where: { idEstadoEvento: eventoData.idEstadoEvento }
            });

            if (!estadoEvento) {
                throw new Error('El estado del evento especificado no existe');
            }
        }

        if (eventoData.nombre && eventoData.nombre !== evento.nombre) {
            const eventoExistente = await this.eventoRepository.findOne({
                where: { nombre: eventoData.nombre }
            });

            if (eventoExistente) {
                throw new Error('El nombre del evento ya está en uso');
            }
        }

        await this.eventoRepository.update(id, eventoData);
        return await this.obtenerEventoPorId(id);
    }

    async eliminarEvento(id: number): Promise<boolean>{
        // Verificar si hay localidades detalle asociadas a este evento
        const localidadesDetalle = await AppDataSource.getRepository('localidad_detalle').count({
            where: { idEvento: id }
        });

        if (localidadesDetalle > 0) {
            throw new Error('No se puede eliminar el evento porque tiene localidades detalle asociadas');
        }

        // Verificar si hay artista eventos asociados
        const artistaEventos = await AppDataSource.getRepository('artista_eventos').count({
            where: { idEvento: id }
        });

        if (artistaEventos > 0) {
            throw new Error('No se puede eliminar el evento porque tiene artistas asociados');
        }

        const resultado = await this.eventoRepository.delete(id);
        return resultado.affected !== 0;
    }

    async obtenerEventosPorMunicipio(idMunicipio: number): Promise<Eventos[]>{
        return await this.eventoRepository.find({
            where: { idMunicipio },
            relations: ['idMunicipio2', 'idEstadoEvento2'],
            order: { fechaInicio: 'DESC' }
        });
    }

    async obtenerEventosPorEstado(idEstadoEvento: number): Promise<Eventos[]>{
        return await this.eventoRepository.find({
            where: { idEstadoEvento },
            relations: ['idMunicipio2', 'idEstadoEvento2'],
            order: { fechaInicio: 'DESC' }
        });
    }

    async obtenerEventosProximos(): Promise<Eventos[]>{
        const fechaActual = new Date().toISOString().split('T')[0];
        
        return await this.eventoRepository
            .createQueryBuilder('evento')
            .leftJoinAndSelect('evento.idMunicipio2', 'municipio')
            .leftJoinAndSelect('evento.idEstadoEvento2', 'estadoEvento')
            .where('evento.fechaInicio >= :fechaActual', { fechaActual })
            .orderBy('evento.fechaInicio', 'ASC')
            .getMany();
    }
}
