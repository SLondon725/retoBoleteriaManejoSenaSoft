import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EstadoTransaccion } from "./EstadoTransaccion";
import { LocalidadDetalle } from "./LocalidadDetalle";
import { MetodoPago } from "./MetodoPago";
import { Usuarios } from "./Usuarios";

@Index("FK_compras_usuarios", ["idUsuario"], {})
@Index("FK_compras_localidad_detalle", ["idLocalidadDetalle"], {})
@Index("FK_compras_estado_transaccion", ["idEstado"], {})
@Index("FK_compras_metodo_pago", ["idMetodoPago"], {})
@Entity("compras", { schema: "manejo_boleteriabd" })
export class Compras {
  @PrimaryGeneratedColumn({ type: "int", name: "id_compra" })
  idCompra!: number;

  @Column("varchar", { name: "id_usuario", length: 50 })
  idUsuario!: string;

  @Column("int", { name: "id_localidad_detalle" })
  idLocalidadDetalle!: number;

  @Column("int", { name: "cantidad_boletas" })
  cantidadBoletas!: number;

  @Column("bigint", { name: "valorTotal" })
  valorTotal!: string;

  @Column("int", { name: "id_estado" })
  idEstado!: number;

  @Column("int", { name: "id_metodo_pago" })
  idMetodoPago!: number;

  @Column("date", { name: "fecha_compra" })
  fechaCompra!: string;

  @ManyToOne(
    () => EstadoTransaccion,
    (estadoTransaccion) => estadoTransaccion.compras,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "id_estado", referencedColumnName: "idEstadoTransaccion" },
  ])
  idEstado2!: EstadoTransaccion;

  @ManyToOne(
    () => LocalidadDetalle,
    (localidadDetalle) => localidadDetalle.compras,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    {
      name: "id_localidad_detalle",
      referencedColumnName: "idLocalidadDetalle",
    },
  ])
  idLocalidadDetalle2!: LocalidadDetalle;

  @ManyToOne(() => MetodoPago, (metodoPago) => metodoPago.compras, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "id_metodo_pago", referencedColumnName: "idMetodoPago" },
  ])
  idMetodoPago2!: MetodoPago;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.compras, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "id_usuario", referencedColumnName: "numIdentificacion" },
  ])
  idUsuario2!: Usuarios;
}
