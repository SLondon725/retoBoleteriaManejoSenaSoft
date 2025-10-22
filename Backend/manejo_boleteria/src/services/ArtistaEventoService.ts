import { AppDataSource } from "@/config/database";
import { Artistas } from "@/entities/Artistas";
import { ArtistaEventos } from "@/entities/ArtistaEventos";
import { Repository } from "typeorm";
import { Eventos } from "@/entities/Eventos";

export class ArtistaEventoService {
    private readonly artistaRepository: Repository<Artistas>;
    private readonly artistaEventoRepository: Repository<ArtistaEventos>;
    private readonly eventoRepository: Repository<Eventos>;
    

    constructor(){
        this.artistaRepository = AppDataSource.getRepository(Artistas);
        this.artistaEventoRepository = AppDataSource.getRepository(ArtistaEventos);
        this.eventoRepository = AppDataSource.getRepository(Eventos);
    }    

    async crearArtistaEvento(artistaEventoData: Partial<ArtistaEventos>): Promise<ArtistaEventos> {
        
        const eventoNuevo = await this.eventoRepository.findOne({
            where: { idEvento: artistaEventoData.idEvento }
        });

        if(!eventoNuevo){
            throw new Error('El evento especificado no existe');
        }

        // Verificar si hay solapamiento de fechas
        if(await this.conflictoHorario(artistaEventoData.idArtista!, new Date(eventoNuevo.fechaInicio), new Date(eventoNuevo.fechaFin))){
            throw new Error('El artista ya tiene un evento en ese rango de fechas');
        }

        const artista = await this.artistaRepository.findOne({
            where: { idArtista: artistaEventoData.idArtista }
        });

        if(!artista){
            throw new Error('El artista especificado no existe');
        }
        const artistaEvento = this.artistaEventoRepository.create(artistaEventoData);
        return await this.artistaEventoRepository.save(artistaEvento);
    }

    async conflictoHorario(idArtista: number, fechaInicioNuevo: Date, fechaFinNuevo: Date): Promise<boolean> {
        const eventosSolapados = await this.artistaEventoRepository.createQueryBuilder('artistaEvento')
        .where('artistaEvento.idArtista = :idArtista', { idArtista })
        .andWhere('artistaEvento.fechaInicio < :fechaFinNuevo AND artistaEvento.fechaFin > :fechaInicioNuevo', { fechaInicioNuevo, fechaFinNuevo })
        .getCount();

        // Si la cuenta es mayor a 0, significa que hay solapamiento
        return eventosSolapados > 0;
    }
}
