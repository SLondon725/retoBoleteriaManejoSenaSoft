import { AppDataSource } from "@/config/database";
import { Artistas } from "@/entities/Artistas";
import { ArtistaEventos } from "@/entities/ArtistaEventos";
import { Repository } from "typeorm";

export class ArtistaService {
    private readonly artistaRepository: Repository<Artistas>;
    private readonly artistaEventoRepository: Repository<ArtistaEventos>;
    

    constructor(){
        this.artistaRepository = AppDataSource.getRepository(Artistas);
        this.artistaEventoRepository = AppDataSource.getRepository(ArtistaEventos);
    }    

    async crearArtista(artistaData: Partial<Artistas>): Promise<Artistas> {
        
        // Verificar que el género musical existe
        const generoMusical = await this.artistaEventoRepository.findOne({
            where: { idArtista: artistaData.idGeneroMusical }
        });

        if (!generoMusical) {
            throw new Error('El género musical especificado no existe');
        }

        // Verificar que el municipio existe
        const municipio = await this.municipioRepository.findOne({
            where: { idMunicipio: artistaData.idCiudadOrigen }
        });

        if (!municipio) {
            throw new Error('El municipio especificado no existe');
        }
        
        const artistaExistente = await this.artistaRepository.findOne({
            where: { nombre: artistaData.nombre }
        });
        
        if (artistaExistente) {
            throw new Error('El nombre del artista ya está en uso');
        }

        const artista = this.artistaRepository.create(artistaData);
        return await this.artistaRepository.save(artista);
    }
}
