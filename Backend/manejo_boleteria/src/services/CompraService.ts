import { AppDataSource } from "@/config/database";
import { Repository } from "typeorm";
import { Compras } from "@/entities/Compras";
import { Usuarios } from "@/entities/Usuarios";
import { LocalidadDetalle } from "@/entities/LocalidadDetalle";
import { EstadoTransaccion } from "@/entities/EstadoTransaccion";
import { MetodoPago } from "@/entities/MetodoPago";

export class CompraService {
    private readonly compraRepository: Repository<Compras>;
    private readonly usuarioRepository: Repository<Usuarios>;
    private readonly localidadDetalleRepository: Repository<LocalidadDetalle>;
    private readonly estadoTransaccionRepository: Repository<EstadoTransaccion>;
    private readonly metodoPagoRepository: Repository<MetodoPago>;

    constructor(){
        this.compraRepository = AppDataSource.getRepository(Compras);
        this.usuarioRepository = AppDataSource.getRepository(Usuarios);
        this.localidadDetalleRepository = AppDataSource.getRepository(LocalidadDetalle);
        this.estadoTransaccionRepository = AppDataSource.getRepository(EstadoTransaccion);
        this.metodoPagoRepository = AppDataSource.getRepository(MetodoPago);
    }

    async obtenerTodasLasCompras(): Promise<void>{
            await this.compraRepository.find({
            relations: ['idEstado2', 'idMetodoPago2', 'idLocalidadDetalle2', 'idUsuario2'],
            order: { idEstado: 'ASC' }
         });
    }

    async obtenerComprasPorFecha(fecha: string): Promise<void>{
        await this.compraRepository.find({
            where: {fechaCompra: fecha},
            relations: ['idEstado2', 'idMetodoPago2', 'idLocalidadDetalle2', 'idUsuario2'],
            order: { idEstado: 'ASC' }
         });
    }
    
    async registrarCompra(compraData: Partial<Compras>): Promise<Compras>{     
        
        if(compraData.cantidadBoletas && compraData.cantidadBoletas > 10){
            throw new Error('Solo se permiten maximo 10 boletas por persona');
        }
        

        const disponibilidadBoletas = await this.localidadDetalleRepository.findOne({
            where: { idLocalidadDetalle: compraData.idLocalidadDetalle }
        });

        if (disponibilidadBoletas?.cantidadDisponible && compraData.cantidadBoletas && disponibilidadBoletas?.cantidadDisponible < compraData.cantidadBoletas) {
            throw new Error('La cantidad de boletas solicitadas superan la disponibilidad');
        }

        const compra = this.compraRepository.create(compraData);
        return await this.compraRepository.save(compra);
    }

    async descontarStockBoleteria(compraData: Partial<Compras>): Promise<LocalidadDetalle | null>{

        const stock = await this.localidadDetalleRepository.findOne({ where: {idLocalidadDetalle: compraData.idLocalidadDetalle}});

        if(stock && stock.cantidadDisponible && stock.cantidadDisponible > 0 && compraData.cantidadBoletas){
            stock.cantidadDisponible -= compraData.cantidadBoletas;
            return await this.localidadDetalleRepository.save(stock);
        }

        return null;
    }

}