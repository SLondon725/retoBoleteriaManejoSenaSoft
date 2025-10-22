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
import { EstadoEvento } from "./EstadoEvento";
import { Municipio } from "./Municipio";  
import { LocalidadDetalle } from "./LocalidadDetalle";

@Index("FK_eventos_municipio", ["idMunicipio"], {})
@Index("FK_eventos_estado_evento", ["idEstadoEvento"], {})
@Entity("eventos", { schema: "manejo_boleteriabd" })
export class Eventos {
  @PrimaryGeneratedColumn({ type: "int", name: "id_evento" })
  idEvento!: number;

  @Column("varchar", { name: "nombre", length: 40 })
  nombre!: string;

  @Column("text", { name: "descripcion" })
  descripcion!: string;

  @Column("date", { name: "fecha_inicio" })
  fechaInicio!: string;

  @Column("time", { name: "hora_inicio" })
  horaInicio!: string;

  @Column("date", { name: "fecha_fin" })
  fechaFin!: string;

  @Column("time", { name: "hora_fin" })
  horaFin!: string;

  @Column("varchar", { name: "lugarRealizacion", length: 60 })
  lugarRealizacion!: string;

  @Column("int", { name: "id_municipio" })
  idMunicipio!: number;

  @Column("int", { name: "id_estado_evento" })
  idEstadoEvento!: number;

  @OneToMany(() => ArtistaEventos, (artistaEventos) => artistaEventos.idEvento2)
  artistaEventos!: ArtistaEventos[];

  @ManyToOne(() => EstadoEvento, (estadoEvento) => estadoEvento.eventos, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "id_estado_evento", referencedColumnName: "idEstadoEvento" },
  ])
  idEstadoEvento2!: EstadoEvento;

  @ManyToOne(() => Municipio, (municipio) => municipio.eventos, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_municipio", referencedColumnName: "idMunicipio" }])
  idMunicipio2!: Municipio;

  @OneToMany(
    () => LocalidadDetalle,
    (localidadDetalle) => localidadDetalle.idEvento2
  )
  localidadDetalles!: LocalidadDetalle[];
}
