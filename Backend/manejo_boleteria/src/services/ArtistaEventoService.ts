import { AppDataSource } from "@/config/database";
import { Artistas } from "@/entities/Artistas";
import { ArtistaEventos } from "@/entities/ArtistaEventos";
import { Repository } from "typeorm";
import { Eventos } from "@/entities/Eventos";

export class ArtistaService {
    private readonly artistaRepository: Repository<Artistas>;
    private readonly artistaEventoRepository: Repository<ArtistaEventos>;
    private readonly eventoRepository: Repository<Eventos>;
    

    constructor(){
        this.artistaRepository = AppDataSource.getRepository(Artistas);
        this.artistaEventoRepository = AppDataSource.getRepository(ArtistaEventos);
        this.eventoRepository = AppDataSource.getRepository(Eventos);
    }    

    async crearArtista(artistaEventoData: Partial<ArtistaEventos>): Promise<Artistas> {
        
        //Validar que el artista no este asginado a ningun evento a la misma hora
        const evento = await this.eventoRepository.findOne({
            where: { idEvento: artistaEventoData.idEvento}
        });

        const eventoHora = await this.eventoRepository.findOne({
            where: { horaInicio: evento?.horaInicio}
        });


        if (!eventoHora) {
            throw new Error('El artista ya tiene un evento asignado a esta hora ');
        }
        
        const artistaExistente = await this.artistaRepository.findOne({
            where: { nombre: artistaEventoData. }
        });
        
        if (artistaExistente) {
            throw new Error('El nombre del artista ya está en uso');
        }

        const artista = this.artistaRepository.create(artistaData);
        return await this.artistaRepository.save(artista);
    }
}
