import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Municipio } from "./Municipio";

@Entity("departamento", { schema: "manejo_boleteriabd" })
export class Departamento {
  @PrimaryGeneratedColumn({ type: "int", name: "id_departamento" })
  idDepartamento!: number;

  @Column("varchar", { name: "nombre", length: 20 })
  nombre!: string;

  @OneToMany(() => Municipio, (municipio) => municipio.idDepartamento2)
  municipios!: Municipio[];
}
