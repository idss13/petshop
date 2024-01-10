import { Controller, Post, Put } from '@nestjs/common';
import { Body, Delete, Get, Param, UseInterceptors } from '@nestjs/common/decorators';
import { HttpException } from '@nestjs/common/exceptions';
import { Result } from 'src/modules/backoffice/models/result.model';
import { Produtos } from 'src/modules/store/entidades/produto.entidade';
import { ProdutoServico } from 'src/modules/store/servicos/produto.servico';


/* Rota definida para chamar os controllers:
localhost:3000/v1/produtos */
@Controller('v1/produtos')
export class ProdutoControlador {

    constructor(
        private readonly servico: ProdutoServico
        ) {}

    
    @Get()
    async ListarTodosProdutos(){
        try{
            const prod = await this.servico.buscar();
            return new Result(null, true, prod, null);
        } catch(error){
            console.log(error)
            throw new HttpException( new Result ('Não foi possível listar os produtos!',false,null, error),400);
        }
    }

    @Post()
    async criarProduto(@Body() entidade: Produtos){
        try{
            await this.servico.criar(entidade);
            return new Result('Produto cadastrado com sucesso!', true, entidade, null);
        } catch(error){
            throw new HttpException( new Result ('Não foi possível cadastrar o produto!',false,null, error),400);
        }
    }

    @Put(':id')
    async atualizarProduto(@Param('id') id, @Body() entidade: Produtos){
        try{
            await this.servico.atualizar(id, entidade);
            return new Result('Produto atualizado com sucesso!', true, entidade, null);
        } catch(error){
            throw new HttpException( new Result ('Não foi possível atualizar o produto!',false,null, error),400);
        }
    }

    @Delete(':id')
    async deletarProduto(@Param('id') id){
        try{
            await this.servico.deletar(id);
            return new Result('Produto removido com sucesso!', true, null, null);
        } catch(error){
            throw new HttpException( new Result ('Não foi possível remover o produto!',false,null, error),400);
        }
    }


}