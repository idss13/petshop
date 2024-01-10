import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produtos} from './entidades/produto.entidade';
import { ProdutoControlador } from './controladores/produto.controlador';
import { ProdutoServico } from './servicos/produto.servico';
import { Pedido } from './entidades/pedido.entidade';
import { ItemPedido } from './entidades/item-pedido.entidade';
import { PedidoControlador } from './controladores/pedido.controlador';
import { PedidoServico } from './servicos/pedido.servico';
import { ItemPedidoServico } from './servicos/item-pedido.servico';

@Module({
    imports: [
        
        TypeOrmModule.forFeature([ 
            Produtos,
            Pedido,
            ItemPedido
        ])    
    ],
    
    controllers: [ 
        ProdutoControlador,
        PedidoControlador
    ],

    providers: [ 
        ProdutoServico,
        PedidoServico,
        ItemPedidoServico
     ],

})
export class StoreModule {}
