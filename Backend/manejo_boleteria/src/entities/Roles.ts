import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuarios } from "./Usuarios";

@Entity("roles", { schema: "manejo_boleteriabd" })
export class Roles {
  @PrimaryGeneratedColumn({ type: "int", name: "id_rol" })
  idRol!: number;

  @Column("varchar", { name: "nombre", length: 20 })
  nombre!: String;

  @OneToMany(() => Usuarios, (usuarios) => usuarios.idRol2)
  usuarios!: Usuarios[];
}
