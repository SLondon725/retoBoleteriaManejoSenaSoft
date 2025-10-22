import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ArtistaEventos } from "./ArtistaEventos";
import { GeneroMusical } from "./GeneroMusical";
import { Municipio } from "./Municipio";

@Index("FK_artistas_genero_musical", ["idGeneroMusical"], {})
@Index("FK_artistas_municipio", ["idCiudadOrigen"], {})
@Entity("artistas", { schema: "manejo_boleteriabd" })
export class Artistas {
  @PrimaryGeneratedColumn({ type: "int", name: "id_artista" })
  idArtista!: number;

  @Column("varchar", { name: "nombre", length: 40 })
  nombre!: string;

  @Column("int", { name: "id_genero_musical" })
  idGeneroMusical!: number;

  @Column("int", { name: "id_ciudad_origen" })
  idCiudadOrigen!: number;

  @OneToMany(
    () => ArtistaEventos,
    (artistaEventos) => artistaEventos.idArtista2
  )
  artistaEventos!: ArtistaEventos[];

  @ManyToOne(() => GeneroMusical, (generoMusical) => generoMusical.artistas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "id_genero_musical", referencedColumnName: "idGeneroMusical" },
  ])
  idGeneroMusical2!: GeneroMusical;

  @ManyToOne(() => Municipio, (municipio) => municipio.artistas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "id_ciudad_origen", referencedColumnName: "idMunicipio" },
  ])
  idCiudadOrigen2!: Municipio;
}
