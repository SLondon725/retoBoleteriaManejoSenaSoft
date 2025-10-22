import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Artistas } from "./Artistas";
import { Eventos } from "./Eventos";
import { Departamento } from "./Departamento";

@Index("FK_municipio_departamento", ["idDepartamento"], {})
@Entity("municipio", { schema: "manejo_boleteriabd" })
export class Municipio {
  @PrimaryGeneratedColumn({ type: "int", name: "id_municipio" })
  idMunicipio!: number;

  @Column("varchar", { name: "nombre", length: 20 })
  nombre!: string;

  @Column("int", { name: "id_departamento", nullable: true })
  idDepartamento!: number | null;

  @OneToMany(() => Artistas, (artistas) => artistas.idCiudadOrigen2)
  artistas!: Artistas[];

  @OneToMany(() => Eventos, (eventos) => eventos.idMunicipio2)
  eventos!: Eventos[];

  @ManyToOne(() => Departamento, (departamento) => departamento.municipios, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "id_departamento", referencedColumnName: "idDepartamento" },
  ])
  idDepartamento2!: Departamento;
}
