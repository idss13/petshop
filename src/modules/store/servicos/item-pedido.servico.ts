import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemPedido } from '../entidades/item-pedido.entidade';
import { Pedido } from '../entidades/pedido.entidade';

 

@Injectable()
export class ItemPedidoServico {
    constructor(
        @InjectRepository(ItemPedido) 
        private readonly repositorio: Repository<ItemPedido>,
        ) {}

 
    async criarItemPedido(item: ItemPedido){
        await this.repositorio.save(item);
    }


}