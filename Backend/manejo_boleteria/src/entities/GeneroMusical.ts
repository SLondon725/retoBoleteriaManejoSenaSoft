import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Artistas } from "./Artistas";

@Entity("genero_musical", { schema: "manejo_boleteriabd" })
export class GeneroMusical {
  @PrimaryGeneratedColumn({ type: "int", name: "id_genero_musical" })
  idGeneroMusical!: number;

  @Column("varchar", { name: "nombre", length: 20 })
  nombre!: string;

  @OneToMany(() => Artistas, (artistas) => artistas.idGeneroMusical2)
  artistas!: Artistas[];
}
