import { Repository } from "typeorm";
import { AppDataSource } from "@/config/database";
import { Usuarios } from "@/entities/Usuarios";
import { Roles } from "@/entities/Roles";


export class UsuarioService {

    private readonly usuarioRepository: Repository<Usuarios>;
    private readonly rolRepository: Repository<Roles>;

    constructor(){
        this.usuarioRepository = AppDataSource.getRepository(Usuarios);
        this.rolRepository = AppDataSource.getRepository(Roles);
    }

    async crearUsuario(usuarioData: Partial<Usuarios>): Promise<Usuarios> {
        
        const rol = await this.rolRepository.findOne({where: {idRol: usuarioData.idRol}});

        if (!rol) {
            throw new Error ('El rol especificado no existe');
        }
        
        const usuarioExistente = await this.usuarioRepository.findOne({
            where: {correo: usuarioData.correo}
        });
        
        if (usuarioExistente) {
            throw new Error ('El correo ya está en uso');
        }

        // Verificar que el número de identificación no esté en uso
        const identificacionExistente = await this.usuarioRepository.findOne({
            where: {numIdentificacion: usuarioData.numIdentificacion}
        });
        
        if (identificacionExistente) {
            throw new Error ('El número de identificación ya está en uso');
        }

        const usuario = this.usuarioRepository.create(usuarioData);
        return await this.usuarioRepository.save(usuario);
    }

    async obtenerTodosLosUsuarios(): Promise<Usuarios[]> {
        return await this.usuarioRepository.find({
            relations: ['idRol2'],
            order: {nombre: 'ASC'}
        });
    }

    async obtenerUsuarioPorId(numIdentificacion: string): Promise<Usuarios | null>{
        return await this.usuarioRepository.findOne({
            where: {numIdentificacion},
            relations: ['idRol2', 'compras']
        });
    }

    async actualizarUsuario(numIdentificacion: string, usuarioData: Partial<Usuarios>): Promise<Usuarios | null> {
        const usuario = await this.usuarioRepository.findOne({
            where: {numIdentificacion} });

        if (!usuario) {
            return null;
        }

        if (usuarioData.idRol && usuarioData.idRol !== usuario.idRol) {
            const rol = await this.rolRepository.findOne({
                where: {idRol: usuarioData.idRol}
            });

            if (!rol) {
                throw new Error ('El rol especificado no existe');
            }
        }

        if (usuarioData.correo && usuarioData.correo !== usuario.correo) {
            const usuarioExistente = await this.usuarioRepository.findOne({
                where: {correo: usuarioData.correo}
            });

            if (usuarioExistente){
                throw new Error('El correo ya está en uso');
            }
        }

        // No permitir cambiar el número de identificación (es la clave primaria)
        if (usuarioData.numIdentificacion && usuarioData.numIdentificacion !== numIdentificacion) {
            throw new Error('No se puede cambiar el número de identificación');
        }

        await this.usuarioRepository.update(numIdentificacion, usuarioData);
        return await this.obtenerUsuarioPorId(numIdentificacion);
    }

    async eliminarUsuario(numIdentificacion: string): Promise<boolean>{
        // Verificar si hay compras asociadas
        const compras = await AppDataSource.getRepository('compras').count({
            where: { idUsuario: numIdentificacion }
        });

        if (compras > 0) {
            throw new Error('No se puede eliminar el usuario porque tiene compras asociadas');
        }

        const resultado = await this.usuarioRepository.delete(numIdentificacion);
        return resultado.affected !== 0;
    }

    async obtenerUsuariosPorRol(idRol: number): Promise<Usuarios[]>{
        return await this.usuarioRepository.find({
            where: {idRol},
            relations: ['idRol2'],
            order: {nombre: 'ASC'}
        });
    }

    async obtenerUsuarioPorCorreo(correo: string): Promise<Usuarios | null>{
        return await this.usuarioRepository.findOne({
            where: {correo},
            relations: ['idRol2']
        });
    }

    async buscarUsuariosPorNombre(nombre: string): Promise<Usuarios[]>{
        return await this.usuarioRepository
            .createQueryBuilder('usuario')
            .leftJoinAndSelect('usuario.idRol2', 'rol')
            .where('usuario.nombre ILIKE :nombre OR usuario.apellido ILIKE :nombre', { 
                nombre: `%${nombre}%` 
            })
            .orderBy('usuario.nombre', 'ASC')
            .getMany();
    }

    async verificarCredenciales(correo: string, pass: string): Promise<Usuarios | null>{
        return await this.usuarioRepository.findOne({
            where: {correo, pass},
            relations: ['idRol2']
        });
    }

    async cambiarPassword(numIdentificacion: string, nuevaPassword: string): Promise<Usuarios | null>{
        const usuario = await this.usuarioRepository.findOne({
            where: {numIdentificacion}
        });

        if (!usuario) {
            return null;
        }

        await this.usuarioRepository.update(numIdentificacion, { pass: nuevaPassword });
        return await this.obtenerUsuarioPorId(numIdentificacion);
    }

}
