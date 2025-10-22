import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Compras } from "./Compras";

@Entity("metodo_pago", { schema: "manejo_boleteriabd" })
export class MetodoPago {
  @PrimaryGeneratedColumn({ type: "int", name: "id_metodo_pago" })
  idMetodoPago!: number;

  @Column("varchar", { name: "nombre", length: 20 })
  nombre!: string;

  @OneToMany(() => Compras, (compras) => compras.idMetodoPago2)
  compras!: Compras[];
}
