import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Compras } from "./Compras";

@Entity("estado_transaccion", { schema: "manejo_boleteriabd" })
export class EstadoTransaccion {
  @PrimaryGeneratedColumn({ type: "int", name: "id_estado_transaccion" })
  idEstadoTransaccion!: number;

  @Column("varchar", { name: "nombre", length: 20 })
  nombre!: string;

  @OneToMany(() => Compras, (compras) => compras.idEstado2)
  compras!: Compras[];
}
