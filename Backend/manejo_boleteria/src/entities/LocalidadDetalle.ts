import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Compras } from "./Compras";
import { Eventos } from "./Eventos";
import { Localidades } from "./Localidades";

@Index("FK_localidad_detalle_eventos", ["idEvento"], {})
@Index("FK_localidad_detalle_localidades", ["idLocalidad"], {})
@Entity("localidad_detalle", { schema: "manejo_boleteriabd" })
export class LocalidadDetalle {
  @PrimaryGeneratedColumn({ type: "int", name: "id_localidad_detalle" })
  idLocalidadDetalle!: number;

  @Column("decimal", { name: "precio", precision: 10, scale: 2 })
  precio!: number;

  @Column("int", { name: "cantidad_disponible" })
  cantidadDisponible!: number;

  @Column("int", { name: "id_localidad" })
  idLocalidad!: number;

  @Column("int", { name: "id_evento" })
  idEvento!: number;

  @OneToMany(() => Compras, (compras) => compras.idLocalidadDetalle2)
  compras!: Compras[];

  @ManyToOne(() => Eventos, (eventos) => eventos.localidadDetalles, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_evento", referencedColumnName: "idEvento" }])
  idEvento2!: Eventos;

  @ManyToOne(
    () => Localidades,
    (localidades) => localidades.localidadDetalles,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_localidad", referencedColumnName: "idLocalidad" }])
  idLocalidad2!: Localidades;
}
