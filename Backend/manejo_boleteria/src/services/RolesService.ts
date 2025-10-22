import { AppDataSource } from "@/config/database";
import { Roles } from "@/entities/Roles";
import { Repository } from "typeorm";

export class RolesService {
    private readonly rolesRepository: Repository<Roles>;

    constructor(){
        this.rolesRepository = AppDataSource.getRepository(Roles);
    }    

    async crearRol(rolData: Partial<Roles>): Promise<Roles> {
        
        const rolExistente = await this.rolesRepository.findOne({
            where: { nombre: rolData.nombre }
        });
        
        if (rolExistente) {
            throw new Error('El nombre del rol ya está en uso');
        }

        const rol = this.rolesRepository.create(rolData);
        return await this.rolesRepository.save(rol);
    }

    async obtenerTodosLosRoles(): Promise<Roles[]> {
        return await this.rolesRepository.find({
            relations: ['usuarios'],
            order: { nombre: 'ASC' }
        });
    }

    async obtenerRolPorId(id: number): Promise<Roles | null>{
        return await this.rolesRepository.findOne({
            where: { idRol: id },
            relations: ['usuarios']
        });
    }

    async actualizarRol(id: number, rolData: Partial<Roles>): Promise<Roles | null> {
        const rol = await this.rolesRepository.findOne({
            where: { idRol: id }
        });

        if (!rol) {
            return null;
        }

        if (rolData.nombre && rolData.nombre !== rol.nombre) {
            const rolExistente = await this.rolesRepository.findOne({
                where: { nombre: rolData.nombre }
            });

            if (rolExistente) {
                throw new Error('El nombre del rol ya está en uso');
            }
        }

        await this.rolesRepository.update(id, rolData);
        return await this.obtenerRolPorId(id);
    }

    async eliminarRol(id: number): Promise<boolean>{
        // Verificar si hay usuarios asociados a este rol
        const usuariosConRol = await AppDataSource.getRepository('usuarios').count({
            where: { idRol: id }
        });

        if (usuariosConRol > 0) {
            throw new Error('No se puede eliminar el rol porque tiene usuarios asociados');
        }

        const resultado = await this.rolesRepository.delete(id);
        return resultado.affected !== 0;
    }

    async buscarRolesPorNombre(nombre: string): Promise<Roles[]>{
        return await this.rolesRepository
            .createQueryBuilder('rol')
            .leftJoinAndSelect('rol.usuarios', 'usuarios')
            .where('rol.nombre ILIKE :nombre', { nombre: `%${nombre}%` })
            .orderBy('rol.nombre', 'ASC')
            .getMany();
    }

    async obtenerUsuariosPorRol(idRol: number): Promise<Roles | null>{
        return await this.rolesRepository.findOne({
            where: { idRol },
            relations: ['usuarios'],
            order: { usuarios: { nombre: 'ASC' } }
        });
    }
}
