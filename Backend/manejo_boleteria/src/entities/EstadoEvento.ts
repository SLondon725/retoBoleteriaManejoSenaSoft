import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Eventos } from "./Eventos";

@Entity("estado_evento", { schema: "manejo_boleteriabd" })
export class EstadoEvento {
  @PrimaryGeneratedColumn({ type: "int", name: "id_estado_evento" })
  idEstadoEvento!: number;

  @Column("varchar", { name: "nombre", length: 20 })
  nombre!: string;

  @OneToMany(() => Eventos, (eventos) => eventos.idEstadoEvento2)
  eventos!: Eventos[];
}
