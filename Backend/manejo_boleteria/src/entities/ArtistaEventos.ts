import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Artistas } from "./Artistas";
import { Eventos } from "./Eventos";

@Index("FK_artista_eventos_eventos", ["idEvento"], {})
@Index("FK_artista_eventos_artistas", ["idArtista"], {})
@Entity("artista_eventos", { schema: "manejo_boleteriabd" })
export class ArtistaEventos {
  @PrimaryGeneratedColumn({ type: "int", name: "id_artista_evento" })
  idArtistaEvento!: number;

  @Column("int", { name: "id_evento" })
  idEvento!: number;

  @Column("int", { name: "id_artista" })
  idArtista!: number;

  @ManyToOne(() => Artistas, (artistas) => artistas.artistaEventos, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_artista", referencedColumnName: "idArtista" }])
  idArtista2!: Artistas;

  @ManyToOne(() => Eventos, (eventos) => eventos.artistaEventos, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_evento", referencedColumnName: "idEvento" }])
  idEvento2!: Eventos;
}
