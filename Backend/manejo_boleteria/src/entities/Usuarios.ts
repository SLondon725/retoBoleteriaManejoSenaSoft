import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Compras } from "./Compras";
import { Roles } from "./Roles";

@Index("FK_usuarios_roles", ["idRol"], {})
@Entity("usuarios", { schema: "manejo_boleteriabd" })
export class Usuarios {
  @Column("varchar", { primary: true, name: "num_identificacion", length: 30 })
  numIdentificacion!: string;

  @Column("varchar", { name: "nombre", length: 40 })
  nombre!: string;

  @Column("varchar", { name: "apellido", length: 40 })
  apellido!: string;

  @Column("varchar", { name: "correo", length: 40 })
  correo!: string;

  @Column("varchar", { name: "pass", length: 40 })
  pass!: string;

  @Column("int", { name: "id_rol" })
  idRol!: number;

  @OneToMany(() => Compras, (compras) => compras.idUsuario2)
  compras!: Compras[];

  @ManyToOne(() => Roles, (roles) => roles.usuarios, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_rol", referencedColumnName: "idRol" }])
  idRol2!: Roles;
}
