import { Controller, Post, Put } from '@nestjs/common';
import { Body, Delete, Get, Param, UseInterceptors } from '@nestjs/common/decorators';
import { HttpException } from '@nestjs/common/exceptions';
import { model } from 'mongoose';
import { Result } from 'src/modules/backoffice/models/result.model';
import { Produtos } from 'src/modules/store/entidades/produto.entidade';
import { ProdutoServico } from 'src/modules/store/servicos/produto.servico';
import { ItemPedidoDto } from '../dtos/item-pedido.dto';
import { ItemPedido } from '../entidades/item-pedido.entidade';
import { Pedido } from '../entidades/pedido.entidade';
import { ItemPedidoServico } from '../servicos/item-pedido.servico';
import { PedidoServico } from '../servicos/pedido.servico';


/* Rota definida para chamar os controllers:
localhost:3000/v1/pedidos */
@Controller('v1/pedidos')
export class PedidoControlador {

    constructor(
        private readonly pedidoServico: PedidoServico,
        private readonly itemPedidoServico: ItemPedidoServico,
        private readonly produtoServico: ProdutoServico
        ) {}

    
    @Get(':pedido')
    async listarPedido(@Param('pedido') pedido: string){
        try{
            const p = await this.pedidoServico.listarPorNumero(pedido);
            return new Result(null, true, p , null);
        } catch(error){
            throw new HttpException( new Result ('Não foi possível listar os pedidos!',false,null, error),400);
        }
    }

    @Get(':cliente')
    async listarPedidosPorCliente(@Param('cliente') cliente: string){
        try{
            const c = await this.pedidoServico.listarPorCliente(cliente);
            return new Result(null, true, c , null);
          
        } catch(error){
            throw new HttpException( new Result ('Não foi possível listar os pedidos desse cliente!',false,null, error),400);
        }
    }


    @Post()
    async criarPedido(@Body() model: ItemPedidoDto[]){
        try{
            let pedido = new Pedido();
            pedido.cliente = '12345678912'; //Vem do Token(JWT)
            pedido.date = new Date();
            pedido.numero = 'ABC123';
            pedido.itens = [];
            await this.pedidoServico.criarPedido(pedido);

            for(const item of model){
                //Rehidratar
                let produto = await this.produtoServico.buscarPorID(item.produto);

                if(produto.quantidadeDisponivel > item.quantidade){
                    new Result ('Não tem estoque suficiente!', false,  null, null);
                }

                let itemPedido = new ItemPedido();
                itemPedido.pedido = pedido;
                itemPedido.produto = produto;
                itemPedido.preco = produto.preco;
                itemPedido.quantidade = item.quantidade;
                await this.itemPedidoServico.criarItemPedido(itemPedido);

            }
            return new Result ('Pedido cadastrado com sucesso', true, model, null);

        } catch(error){
            throw new HttpException( new Result ('Não foi possível cadastrar o pedido!',false,null, error),400);
        }
    }


}