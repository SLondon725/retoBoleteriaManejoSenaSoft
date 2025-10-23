import { AppDataSource } from "@/config/database";
import { Compras } from "@/entities/Compras";
import { LocalidadDetalle } from "@/entities/LocalidadDetalle";
import { Repository } from "typeorm";

export class ComprasService {
    private readonly comprasRepository: Repository<Compras>;
    private readonly localidadDetalleRepository: Repository<LocalidadDetalle>;

    constructor(){
        this.comprasRepository = AppDataSource.getRepository(Compras);
        this.localidadDetalleRepository = AppDataSource.getRepository(LocalidadDetalle);
    }

    async crearCompra(compraData: Partial<Compras>): Promise<Compras> {
        // Validar que la cantidad no exceda 10 boletas (RF8)
        if (compraData.cantidadBoletas && compraData.cantidadBoletas > 10) {
            throw new Error('No se pueden comprar más de 10 boletas por transacción');
        }

        // Validar que existe la localidad detalle
        const localidadDetalle = await this.localidadDetalleRepository.findOne({
            where: { idLocalidadDetalle: compraData.idLocalidadDetalle }
        });

        if (!localidadDetalle) {
            throw new Error('La localidad detalle especificada no existe');
        }

        // Validar que hay suficientes boletas disponibles (RF10)
        if (compraData.cantidadBoletas && compraData.cantidadBoletas > localidadDetalle.cantidadDisponible) {
            throw new Error(`No hay suficientes boletas disponibles. Disponibles: ${localidadDetalle.cantidadDisponible}`);
        }

        // Calcular valor total si no se proporciona
        if (!compraData.valorTotal && compraData.cantidadBoletas) {
            compraData.valorTotal = compraData.cantidadBoletas * localidadDetalle.precio;
        }

        // Establecer fecha de compra si no se proporciona
        if (!compraData.fechaCompra) {
            compraData.fechaCompra = new Date().toISOString().split('T')[0];
        }

        const compra = this.comprasRepository.create(compraData);
        const compraGuardada = await this.comprasRepository.save(compra);

        // Actualizar cantidad disponible (RF9)
        await this.actualizarCantidadDisponible(
            compraData.idLocalidadDetalle!, 
            localidadDetalle.cantidadDisponible - compraData.cantidadBoletas!
        );

        return compraGuardada;
    }

    async obtenerTodasLasCompras(): Promise<Compras[]> {
        return await this.comprasRepository.find({
            relations: ['idUsuario2', 'idLocalidadDetalle2', 'idEstado2', 'idMetodoPago2'],
            order: { fechaCompra: 'DESC' }
        });
    }

    async obtenerCompraPorId(id: number): Promise<Compras | null> {
        return await this.comprasRepository.findOne({
            where: { idCompra: id },
            relations: ['idUsuario2', 'idLocalidadDetalle2', 'idEstado2', 'idMetodoPago2']
        });
    }

    async obtenerComprasPorUsuario(idUsuario: string): Promise<Compras[]> {
        return await this.comprasRepository.find({
            where: { idUsuario },
            relations: ['idLocalidadDetalle2', 'idEstado2', 'idMetodoPago2'],
            order: { fechaCompra: 'DESC' }
        });
    }

    async actualizarCompra(id: number, compraData: Partial<Compras>): Promise<Compras | null> {
        const compra = await this.comprasRepository.findOne({
            where: { idCompra: id }
        });

        if (!compra) {
            return null;
        }

        await this.comprasRepository.update(id, compraData);
        return await this.obtenerCompraPorId(id);
    }

    async eliminarCompra(id: number): Promise<boolean> {
        const resultado = await this.comprasRepository.delete(id);
        return resultado.affected !== 0;
    }

    async buscarComprasPorEvento(idEvento: number): Promise<Compras[]> {
        return await this.comprasRepository
            .createQueryBuilder('compra')
            .leftJoinAndSelect('compra.idUsuario2', 'usuario')
            .leftJoinAndSelect('compra.idLocalidadDetalle2', 'localidadDetalle')
            .leftJoinAndSelect('compra.idEstado2', 'estado')
            .leftJoinAndSelect('compra.idMetodoPago2', 'metodoPago')
            .leftJoin('localidadDetalle.idEvento2', 'evento')
            .where('evento.idEvento = :idEvento', { idEvento })
            .orderBy('compra.fechaCompra', 'DESC')
            .getMany();
    }

    async buscarComprasPorFecha(fechaInicio: string, fechaFin: string): Promise<Compras[]> {
        return await this.comprasRepository
            .createQueryBuilder('compra')
            .leftJoinAndSelect('compra.idUsuario2', 'usuario')
            .leftJoinAndSelect('compra.idLocalidadDetalle2', 'localidadDetalle')
            .leftJoinAndSelect('compra.idEstado2', 'estado')
            .leftJoinAndSelect('compra.idMetodoPago2', 'metodoPago')
            .where('compra.fechaCompra BETWEEN :fechaInicio AND :fechaFin', { fechaInicio, fechaFin })
            .orderBy('compra.fechaCompra', 'DESC')
            .getMany();
    }

    private async actualizarCantidadDisponible(idLocalidadDetalle: number, nuevaCantidad: number): Promise<void> {
        await this.localidadDetalleRepository.update(idLocalidadDetalle, {
            cantidadDisponible: nuevaCantidad
        });
    }
}
