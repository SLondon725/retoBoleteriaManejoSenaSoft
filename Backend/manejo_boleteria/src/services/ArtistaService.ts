import { AppDataSource } from "@/config/database";
import { Artistas } from "@/entities/Artistas";
import { GeneroMusical } from "@/entities/GeneroMusical";
import { Municipio } from "@/entities/Municipio";
import { Repository } from "typeorm";

export class ArtistaService {
    private readonly artistaRepository: Repository<Artistas>;
    private readonly generoMusicalRepository: Repository<GeneroMusical>;
    private readonly municipioRepository: Repository<Municipio>;

    constructor(){
        this.artistaRepository = AppDataSource.getRepository(Artistas);
        this.generoMusicalRepository = AppDataSource.getRepository(GeneroMusical);
        this.municipioRepository = AppDataSource.getRepository(Municipio);
    }    

    async crearArtista(artistaData: Partial<Artistas>): Promise<Artistas> {
        
        // Verificar que el género musical existe
        const generoMusical = await this.generoMusicalRepository.findOne({
            where: { idGeneroMusical: artistaData.idGeneroMusical }
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

    async obtenerTodosLosArtistas(): Promise<Artistas[]> {
        return await this.artistaRepository.find({
            relations: ['idGeneroMusical2', 'idCiudadOrigen2'],
            order: { nombre: 'ASC' }
        });
    }

    async obtenerArtistaPorId(id: number): Promise<Artistas | null>{
        return await this.artistaRepository.findOne({
            where: { idArtista: id },
            relations: ['idGeneroMusical2', 'idCiudadOrigen2', 'artistaEventos']
        });
    }

    async actualizarArtista(id: number, artistaData: Partial<Artistas>): Promise<Artistas | null> {
        const artista = await this.artistaRepository.findOne({
            where: { idArtista: id }
        });

        if (!artista) {
            return null;
        }

        if (artistaData.idGeneroMusical && artistaData.idGeneroMusical !== artista.idGeneroMusical) {
            const generoMusical = await this.generoMusicalRepository.findOne({
                where: { idGeneroMusical: artistaData.idGeneroMusical }
            });

            if (!generoMusical) {
                throw new Error('El género musical especificado no existe');
            }
        }

        if (artistaData.idCiudadOrigen && artistaData.idCiudadOrigen !== artista.idCiudadOrigen) {
            const municipio = await this.municipioRepository.findOne({
                where: { idMunicipio: artistaData.idCiudadOrigen }
            });

            if (!municipio) {
                throw new Error('El municipio especificado no existe');
            }
        }

        if (artistaData.nombre && artistaData.nombre !== artista.nombre) {
            const artistaExistente = await this.artistaRepository.findOne({
                where: { nombre: artistaData.nombre }
            });

            if (artistaExistente) {
                throw new Error('El nombre del artista ya está en uso');
            }
        }

        await this.artistaRepository.update(id, artistaData);
        return await this.obtenerArtistaPorId(id);
    }

    async eliminarArtista(id: number): Promise<boolean>{
        // Verificar si hay eventos asociados a este artista
        const eventosConArtista = await AppDataSource.getRepository('artista_eventos').count({
            where: { idArtista: id }
        });

        if (eventosConArtista > 0) {
            throw new Error('No se puede eliminar el artista porque tiene eventos asociados');
        }

        const resultado = await this.artistaRepository.delete(id);
        return resultado.affected !== 0;
    }

    async obtenerArtistasPorGenero(idGeneroMusical: number): Promise<Artistas[]>{
        return await this.artistaRepository.find({
            where: { idGeneroMusical },
            relations: ['idGeneroMusical2', 'idCiudadOrigen2'],
            order: { nombre: 'ASC' }
        });
    }

    async obtenerArtistasPorMunicipio(idMunicipio: number): Promise<Artistas[]>{
        return await this.artistaRepository.find({
            where: { idCiudadOrigen: idMunicipio },
            relations: ['idGeneroMusical2', 'idCiudadOrigen2'],
            order: { nombre: 'ASC' }
        });
    }
}
