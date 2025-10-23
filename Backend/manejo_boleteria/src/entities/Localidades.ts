import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LocalidadDetalle } from "./LocalidadDetalle";

@Entity("localidades", { schema: "manejo_boleteriabd" })
export class Localidades {
  @PrimaryGeneratedColumn({ type: "int", name: "id_localidad" })
  idLocalidad!: number;

  @Column("varchar", { name: "nombre", length: 40 })
  nombre!: string;

  @OneToMany(
    () => LocalidadDetalle,
    (localidadDetalle) => localidadDetalle.idLocalidad2
  )
  localidadDetalles!: LocalidadDetalle[];
}
