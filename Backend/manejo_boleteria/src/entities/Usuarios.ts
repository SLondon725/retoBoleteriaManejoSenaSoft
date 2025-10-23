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
  @Column("varchar", { name: "tipo_documento", length: 10 })
  tipo_documento!: string;

  @Column("varchar", { primary: true, name: "num_identificacion", length: 30 })
  num_identificacion!: string;

  @Column("varchar", { name: "nombres", length: 40 })
  nombres!: string;

  @Column("varchar", { name: "apellidos", length: 40 })
  apellidos!: string;

  @Column("varchar", { name: "correo", length: 100, unique: true })
  correo!: string;

  @Column("varchar", { name: "pass", length: 255 })
  pass!: string;

  @Column("varchar", { name: "telefono", length: 15, nullable: true })
  telefono?: string;

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
