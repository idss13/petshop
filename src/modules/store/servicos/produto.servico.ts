import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produtos } from '../entidades/produto.entidade';
 

@Injectable()
export class ProdutoServico {
    constructor(
        @InjectRepository(Produtos) 
        private readonly repositorio: Repository<Produtos>,
        ) {}

 
    async buscar(): Promise<Produtos[]> {
        return await this.repositorio.find();
    }

    async buscarPorID(id: number): Promise<Produtos> {
        return await this.repositorio.findOneBy({id: id});
    }

    async criar(produto : Produtos){
        await this.repositorio.save(produto);
    }
    
    async atualizar(id: number, produto : Produtos){
        await this.repositorio.update(id, produto);
    }

    async deletar(id: number){
        await this.repositorio.delete(id);
    }

}