import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../entidades/pedido.entidade';

 

@Injectable()
export class PedidoServico {
    constructor(
        @InjectRepository(Pedido) 
        private readonly repositorio: Repository<Pedido>,
        ) {}

 
    async listarPorNumero(numero: string): Promise<Pedido> {
        return await this.repositorio.findOneBy({numero: numero});
    }

    async listarPorCliente(cliente: string): Promise<Pedido[]> {
        return await this.repositorio.findBy({cliente: cliente});
    }
    
    async criarPedido(pedido: Pedido){
        await this.repositorio.save(pedido);
    }


}